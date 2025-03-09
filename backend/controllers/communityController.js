const { Group, Post } = require('../models/communityModel');
const User = require('../models/userModel');
const openai = require('../config/openai');

// @desc    Yeni grup oluştur
// @route   POST /api/community/groups
// @access  Private
const createGroup = async (req, res) => {
  try {
    console.log('createGroup çağrıldı, body:', req.body);
    const { name, description, category, isPrivate, imageUrl } = req.body;
    
    console.log('Kullanıcı:', req.user);
    
    if (!name || !description) {
      return res.status(400).json({ message: 'Grup adı ve açıklama zorunludur' });
    }
    
    const newGroup = new Group({
      name,
      description,
      category,
      isPrivate: isPrivate || false,
      admin: req.user._id,
      members: [req.user._id],
      imageUrl
    });

    console.log('Oluşturulan grup:', newGroup);
    const group = await newGroup.save();
    console.log('Grup kaydedildi:', group._id);
    res.status(201).json(group);
  } catch (error) {
    console.error('Grup oluşturma hatası:', error);
    res.status(500).json({ message: 'Grup oluşturulurken bir hata oluştu', error: error.message });
  }
};

// @desc    Tüm grupları getir
// @route   GET /api/community/groups
// @access  Private
const getGroups = async (req, res) => {
  try {
    // Parametrelerden filtreleme seçeneklerini al
    const { category, search } = req.query;
    
    // Filtreleme koşullarını oluştur
    let filter = {};
    
    // Kategori filtreleme
    if (category) {
      filter.category = category;
    }
    
    // İsim veya açıklama ile arama
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Grupları getir (gizli grupları kullanıcı üye değilse gösterme)
    const groups = await Group.find({
      $or: [
        { isPrivate: false },
        { members: req.user._id }
      ],
      ...filter
    })
      .populate('admin', 'name profilePicture')
      .populate('members', 'name profilePicture')
      .sort('-createdAt');
    
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Gruplar getirilirken bir hata oluştu', error: error.message });
  }
};

// @desc    Grup detayı getir
// @route   GET /api/community/groups/:id
// @access  Private
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('admin', 'name profilePicture')
      .populate('members', 'name profilePicture')
      .populate({
        path: 'posts',
        populate: [
          { path: 'user', select: 'name profilePicture' },
          { 
            path: 'comments', 
            populate: { path: 'user', select: 'name profilePicture' } 
          }
        ]
      });

    if (!group) {
      return res.status(404).json({ message: 'Grup bulunamadı' });
    }

    // Gizli grup ve kullanıcı üye değilse erişimi engelle
    if (group.isPrivate && !group.members.some(member => member._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Bu gruba erişim yetkiniz yok' });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ message: 'Grup detayı getirilirken bir hata oluştu', error: error.message });
  }
};

// @desc    Gruba katıl
// @route   POST /api/community/groups/:id/join
// @access  Private
const joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Grup bulunamadı' });
    }

    // Kullanıcı zaten üye mi kontrol et
    if (group.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'Zaten bu grubun üyesisiniz' });
    }

    // Gizli grup ise üyelik isteği gönder
    if (group.isPrivate) {
      // Zaten istek gönderilmiş mi kontrol et
      if (group.pendingMembers.includes(req.user._id)) {
        return res.status(400).json({ message: 'Üyelik isteğiniz zaten gönderilmiş' });
      }

      group.pendingMembers.push(req.user._id);
      await group.save();
      
      return res.status(200).json({ message: 'Üyelik isteği gönderildi' });
    }

    // Açık grup ise direkt üye ekle
    group.members.push(req.user._id);
    await group.save();
    
    res.status(200).json({ message: 'Gruba başarıyla katıldınız' });
  } catch (error) {
    res.status(500).json({ message: 'Gruba katılırken bir hata oluştu', error: error.message });
  }
};

// @desc    Gruptan ayrıl
// @route   POST /api/community/groups/:id/leave
// @access  Private
const leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Grup bulunamadı' });
    }

    // Admin gruptan ayrılamaz
    if (group.admin.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Grup yöneticisi olarak gruptan ayrılamazsınız' });
    }

    // Kullanıcı üye mi kontrol et
    if (!group.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'Bu grubun üyesi değilsiniz' });
    }

    // Üyelikten çıkar
    group.members = group.members.filter(
      member => member.toString() !== req.user._id.toString()
    );
    
    await group.save();
    res.status(200).json({ message: 'Gruptan başarıyla ayrıldınız' });
  } catch (error) {
    res.status(500).json({ message: 'Gruptan ayrılırken bir hata oluştu', error: error.message });
  }
};

// @desc    Üyelik isteklerini yönet (onay/red)
// @route   POST /api/community/groups/:id/manage-requests
// @access  Private
const manageRequests = async (req, res) => {
  try {
    const { userId, action } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Grup bulunamadı' });
    }

    // Sadece admin işlem yapabilir
    if (group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    // Üyelik isteği var mı kontrol et
    if (!group.pendingMembers.includes(userId)) {
      return res.status(400).json({ message: 'Geçerli bir üyelik isteği bulunamadı' });
    }

    // Bekleyen üyelikten çıkar
    group.pendingMembers = group.pendingMembers.filter(
      member => member.toString() !== userId
    );

    // Eğer onaylanırsa üye ekle
    if (action === 'approve') {
      group.members.push(userId);
    }

    await group.save();
    res.status(200).json({ 
      message: action === 'approve' ? 'Üyelik isteği onaylandı' : 'Üyelik isteği reddedildi' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Üyelik isteği işlenirken bir hata oluştu', error: error.message });
  }
};

// @desc    Yeni gönderi oluştur
// @route   POST /api/community/groups/:id/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { content, category, tags, imageUrl } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: 'Grup bulunamadı' });
    }

    // Kullanıcı üye mi kontrol et
    if (!group.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Bu gruba gönderi yapmak için üye olmalısınız' });
    }

    // AI moderasyonu
    let aiModerationResult = { isApproved: true, reason: '' };
    try {
      const moderationResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "user", 
            content: `Bu topluluk gönderisini içerik politikası açısından değerlendir. Gönderi bir fitness ve sağlık topluluğuna aittir. Şunlara dikkat et:
            1. Zararlı, tehlikeli veya sağlıksız diyet/egzersiz önerisi var mı?
            2. Hakaret, nefret söylemi veya saldırgan içerik var mı?
            3. Bilimsel olarak yanlış sağlık bilgisi var mı?
            4. Reklam veya spam içerik var mı?
            
            Sadece JSON formatında yanıt ver: {"isApproved": true/false, "reason": "Red sebebi (eğer reddedilirse)"}
            
            İçerik: ${content}`
          }
        ],
        temperature: 0.5,
        max_tokens: 150
      });

      try {
        aiModerationResult = JSON.parse(moderationResponse.choices[0].message.content);
      } catch (parseError) {
        console.error('AI moderasyon sonucu ayrıştırılamadı:', parseError);
      }
    } catch (aiError) {
      console.error('AI moderasyon hatası:', aiError);
    }

    // Eğer moderasyon kontrolünden geçemediyse
    if (!aiModerationResult.isApproved) {
      return res.status(400).json({ 
        message: 'İçerik politikalarımıza uymadığı için gönderi yayınlanamadı',
        reason: aiModerationResult.reason 
      });
    }

    // Yeni gönderi oluştur
    const newPost = {
      user: req.user._id,
      content,
      imageUrl,
      category: category || 'general',
      tags: tags || [],
      aiModeratedAt: new Date(),
      aiModerationResult
    };

    // Gruba gönderiyi ekle
    group.posts.push(newPost);
    await group.save();
    
    // Son eklenen gönderiyi bul ve kullanıcı bilgileriyle doldur
    const addedPost = group.posts[group.posts.length - 1];
    const populatedGroup = await Group.findById(group._id).populate({
      path: 'posts',
      match: { _id: addedPost._id },
      populate: { path: 'user', select: 'name profilePicture' }
    });

    res.status(201).json(populatedGroup.posts[0]);
  } catch (error) {
    res.status(500).json({ message: 'Gönderi oluşturulurken bir hata oluştu', error: error.message });
  }
};

// @desc    Gönderi sil
// @route   DELETE /api/community/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    // Gönderiyi içeren grubu bul
    const group = await Group.findOne({ 'posts._id': req.params.id });

    if (!group) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    // Gönderiyi bul
    const post = group.posts.id(req.params.id);

    // Gönderi sahibi veya grup yöneticisi mi kontrol et
    if (post.user.toString() !== req.user._id.toString() && group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    // Gönderiyi kaldır
    post.remove();
    await group.save();
    
    res.json({ message: 'Gönderi başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Gönderi silinirken bir hata oluştu', error: error.message });
  }
};

// @desc    Gönderi beğen/beğenme
// @route   POST /api/community/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    // Gönderiyi içeren grubu bul
    const group = await Group.findOne({ 'posts._id': req.params.id });

    if (!group) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    // Gönderiyi bul
    const post = group.posts.id(req.params.id);

    // Kullanıcı üye mi kontrol et
    if (!group.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Bu işlem için grup üyesi olmalısınız' });
    }

    // Kullanıcı zaten beğenmiş mi?
    const likeIndex = post.likes.indexOf(req.user._id);
    
    if (likeIndex > -1) {
      // Beğeniyi kaldır
      post.likes.splice(likeIndex, 1);
    } else {
      // Beğeni ekle
      post.likes.push(req.user._id);
    }

    await group.save();
    
    res.json({ 
      likes: post.likes.length,
      isLiked: likeIndex <= -1
    });
  } catch (error) {
    res.status(500).json({ message: 'İşlem yapılırken bir hata oluştu', error: error.message });
  }
};

// @desc    Yorumu ekle
// @route   POST /api/community/posts/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    // Gönderiyi içeren grubu bul
    const group = await Group.findOne({ 'posts._id': req.params.id });

    if (!group) {
      return res.status(404).json({ message: 'Gönderi bulunamadı' });
    }

    // Gönderiyi bul
    const post = group.posts.id(req.params.id);

    // Kullanıcı üye mi kontrol et
    if (!group.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Bu işlem için grup üyesi olmalısınız' });
    }

    // Yorum ekle
    post.comments.push({
      user: req.user._id,
      content,
      createdAt: new Date()
    });

    await group.save();
    
    // Son eklenen yorumu bul ve kullanıcı bilgileriyle doldur
    const addedComment = post.comments[post.comments.length - 1];
    const populatedGroup = await Group.findOne({ 'posts._id': req.params.id }).populate({
      path: 'posts.comments.user',
      select: 'name profilePicture'
    });

    const populatedPost = populatedGroup.posts.id(req.params.id);
    const populatedComment = populatedPost.comments.id(addedComment._id);
    
    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Yorum eklenirken bir hata oluştu', error: error.message });
  }
};

// @desc    Yorumu sil
// @route   DELETE /api/community/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    // Yorumu içeren grubu bul
    const group = await Group.findOne({ 'posts.comments._id': req.params.id });

    if (!group) {
      return res.status(404).json({ message: 'Yorum bulunamadı' });
    }

    // İlgili gönderi ve yorumu bul
    let commentFound = false;
    let commentPost = null;
    let comment = null;

    for (const post of group.posts) {
      comment = post.comments.id(req.params.id);
      if (comment) {
        commentFound = true;
        commentPost = post;
        break;
      }
    }

    if (!commentFound) {
      return res.status(404).json({ message: 'Yorum bulunamadı' });
    }

    // Yorum sahibi, gönderi sahibi veya grup yöneticisi mi kontrol et
    if (
      comment.user.toString() !== req.user._id.toString() && 
      commentPost.user.toString() !== req.user._id.toString() && 
      group.admin.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    // Yorumu kaldır
    comment.remove();
    await group.save();
    
    res.json({ message: 'Yorum başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Yorum silinirken bir hata oluştu', error: error.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
  manageRequests,
  createPost,
  deletePost,
  likePost,
  addComment,
  deleteComment
};