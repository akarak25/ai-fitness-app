import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { communityApi } from '../utils/api';
import { 
  UserGroupIcon, 
  UsersIcon, 
  PaperAirplaneIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [commentContent, setCommentContent] = useState({});
  const [showingComments, setShowingComments] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await communityApi.getGroupById(id);
        setGroup(response);
      } catch (error) {
        console.error('Grup detayları yüklenemedi:', error);
        toast.error('Grup detayları yüklenemedi');
        navigate('/community');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id, navigate]);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    if (!postContent.trim()) {
      toast.error('Lütfen bir gönderi içeriği yazın');
      return;
    }
    
    try {
      setSubmitting(true);
      await communityApi.createPost(id, { content: postContent });
      setPostContent('');
      
      // Grubu yeniden yükle
      const updatedGroup = await communityApi.getGroupById(id);
      setGroup(updatedGroup);
      
      toast.success('Gönderi başarıyla oluşturuldu');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Gönderi oluşturulurken bir hata oluştu'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitComment = async (postId) => {
    if (!commentContent[postId]?.trim()) {
      toast.error('Lütfen bir yorum yazın');
      return;
    }
    
    try {
      setSubmitting(true);
      await communityApi.addComment(postId, commentContent[postId]);
      
      // Yorum içeriğini temizle
      setCommentContent(prev => ({
        ...prev,
        [postId]: ''
      }));
      
      // Grubu yeniden yükle
      const updatedGroup = await communityApi.getGroupById(id);
      setGroup(updatedGroup);
      
      toast.success('Yorum başarıyla eklendi');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Yorum eklenirken bir hata oluştu'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleLikePost = async (postId) => {
    try {
      const response = await communityApi.likePost(postId);
      
      // Grubu yeniden yükle
      const updatedGroup = await communityApi.getGroupById(id);
      setGroup(updatedGroup);
      
      if (response.isLiked) {
        toast.success('Gönderi beğenildi');
      } else {
        toast.info('Gönderi beğenisi kaldırıldı');
      }
    } catch (error) {
      toast.error('İşlem sırasında bir hata oluştu');
    }
  };

  const toggleShowComments = (postId) => {
    setShowingComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const deletePost = async (postId) => {
    if (!window.confirm('Bu gönderiyi silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      await communityApi.deletePost(postId);
      
      // Grubu yeniden yükle
      const updatedGroup = await communityApi.getGroupById(id);
      setGroup(updatedGroup);
      
      toast.success('Gönderi başarıyla silindi');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Gönderi silinirken bir hata oluştu'
      );
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      await communityApi.deleteComment(commentId);
      
      // Grubu yeniden yükle
      const updatedGroup = await communityApi.getGroupById(id);
      setGroup(updatedGroup);
      
      toast.success('Yorum başarıyla silindi');
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Yorum silinirken bir hata oluştu'
      );
    }
  };

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="text-center py-12">
        <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Grup Bulunamadı</h3>
        <p className="mt-1 text-sm text-gray-500">
          İstediğiniz grup bulunamadı veya erişim izniniz yok.
        </p>
        <div className="mt-6">
          <Link
            to="/community"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Topluluğa Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  const isAdmin = group.admin._id === (typeof group.admin === 'object' ? group.admin._id : group.admin);
  const isMember = group.members.some(member => member._id === (typeof member === 'object' ? member._id : member));

  return (
    <div>
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <Link to="/community" className="text-gray-400 hover:text-gray-500">
                  <UserGroupIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Topluluk</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-500 truncate">{group.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {group.imageUrl ? (
                <img
                  className="h-16 w-16 rounded-full"
                  src={group.imageUrl}
                  alt={group.name}
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <UserGroupIcon className="h-8 w-8 text-primary-600" />
                </div>
              )}
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">{group.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {group.category === 'weight_loss' ? 'Kilo Verme' :
                     group.category === 'muscle_gain' ? 'Kas Kazanımı' :
                     group.category === 'running' ? 'Koşu' :
                     group.category === 'yoga' ? 'Yoga' :
                     group.category === 'nutrition' ? 'Beslenme' :
                     group.category === 'beginners' ? 'Başlangıç' :
                     group.category === 'advanced' ? 'İleri Seviye' : 'Diğer'}
                  </span>
                  <span className="flex items-center ml-3 text-sm text-gray-500">
                    <UsersIcon className="h-4 w-4 mr-1" />
                    {group.members?.length || 0} üye
                  </span>
                  {group.isPrivate && (
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Özel Grup
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-500">{group.description}</p>
          </div>
        </div>
      </div>

      {/* Gönderi Oluşturma Formu */}
      {isMember && (
        <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Yeni Gönderi</h3>
            <form className="mt-5" onSubmit={handleSubmitPost}>
              <div>
                <textarea
                  id="post-content"
                  name="post-content"
                  rows={4}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Ne düşünüyorsunuz?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !postContent.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <PaperAirplaneIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Paylaş
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gönderiler */}
      <div className="mt-6 space-y-6">
        {group.posts && group.posts.length > 0 ? (
          group.posts.slice().reverse().map((post) => (
            <div key={post._id} className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {post.user.profilePicture ? (
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.user.profilePicture}
                        alt={post.user.name}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {post.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{post.user.name}</p>
                      <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  {(post.user._id === (typeof post.user === 'object' ? post.user._id : post.user) || isAdmin) && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => deletePost(post._id)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-gray-900 whitespace-pre-line">{post.content}</p>
                  {post.imageUrl && (
                    <div className="mt-4">
                      <img
                        src={post.imageUrl}
                        alt="Post"
                        className="rounded-lg mx-auto max-h-96 object-cover"
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => toggleLikePost(post._id)}
                      className={`flex items-center text-sm ${
                        post.likes.includes(post.user._id) ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {post.likes.includes(post.user._id) ? (
                        <HeartIconSolid className="h-5 w-5 mr-1" />
                      ) : (
                        <HeartIcon className="h-5 w-5 mr-1" />
                      )}
                      {post.likes.length}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleShowComments(post._id)}
                      className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                    >
                      <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
                      {post.comments.length}
                    </button>
                  </div>
                  <div>
                    {post.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {post.category === 'success_story' ? 'Başarı Hikayesi' :
                         post.category === 'question' ? 'Soru' :
                         post.category === 'motivation' ? 'Motivasyon' :
                         post.category === 'recipe' ? 'Tarif' :
                         post.category === 'workout' ? 'Antrenman' : 'Genel'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Yorumlar */}
              {showingComments[post._id] && (
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900">Yorumlar</h4>
                  <div className="mt-4 space-y-4">
                  {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment) => (
                        <div key={comment._id} className="flex space-x-3">
                          {comment.user.profilePicture ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={comment.user.profilePicture}
                              alt={comment.user.name}
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {comment.user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div className="flex-1 bg-white px-4 py-2 rounded-lg relative">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">{comment.user.name}</p>
                              <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                            <p className="text-sm text-gray-500">{comment.content}</p>
                            
                            {(comment.user._id === (typeof comment.user === 'object' ? comment.user._id : comment.user) || isAdmin) && (
                              <button
                                type="button"
                                onClick={() => deleteComment(comment._id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Yorumu Sil</span>
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Henüz yorum yapılmamış.</p>
                    )}
                  </div>
                  {isMember && (
                    <div className="mt-4">
                      <div className="flex space-x-3">
                        {(post.user.profilePicture || '') ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={post.user.profilePicture}
                            alt={post.user.name}
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {post.user.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="relative rounded-lg shadow-sm">
                            <input
                              type="text"
                              className="focus:ring-primary-500 focus:border-primary-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
                              placeholder="Yorum yaz..."
                              value={commentContent[post._id] || ''}
                              onChange={(e) => setCommentContent(prev => ({
                                ...prev,
                                [post._id]: e.target.value
                              }))}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                              <button
                                type="button"
                                onClick={() => handleSubmitComment(post._id)}
                                disabled={submitting || !(commentContent[post._id]?.trim())}
                                className="text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white shadow overflow-hidden rounded-lg">
            <ChatBubbleLeftIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz gönderi yok</h3>
            <p className="mt-1 text-sm text-gray-500">
              Bu gruba ilk gönderiyi siz yapın.
            </p>
            {isMember && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => document.getElementById('post-content')?.focus()}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <PaperAirplaneIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Gönderi Oluştur
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;