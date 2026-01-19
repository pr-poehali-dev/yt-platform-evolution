import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  subscribers: string;
  views: string;
  uploadDate: string;
  description: string;
  likes: string;
  thumbnail: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

const MOCK_VIDEO: Video = {
  id: '1',
  title: 'Обзор новых технологий 2026: что изменится в мире IT',
  channel: 'Tech Review',
  channelAvatar: '',
  subscribers: '2.5M',
  views: '1,234,567',
  uploadDate: '15 янв. 2026 г.',
  description: 'В этом видео я расскажу о главных технологических трендах 2026 года. Мы разберем искусственный интеллект, квантовые компьютеры, AR/VR технологии и многое другое.',
  likes: '45K',
  thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/3ed022f1-ff42-4eb3-b66c-e912edcbb1b2.jpg'
};

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: 'Алексей Иванов',
    avatar: '',
    text: 'Отличный обзор! Особенно понравилась часть про квантовые компьютеры.',
    time: '2 дня назад',
    likes: 234
  },
  {
    id: '2',
    author: 'Мария Петрова',
    avatar: '',
    text: 'Спасибо за информацию! Очень актуальная тема.',
    time: '1 день назад',
    likes: 89
  }
];

const RECOMMENDED_VIDEOS = [
  {
    id: '2',
    title: 'LIVE: Стрим по новой игре - прохождение с нуля',
    channel: 'Gaming Pro',
    views: '850K',
    uploadTime: '5 часов назад',
    thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/89f30c15-2f58-450a-a846-eb95a3b55f54.jpg',
    duration: '2:15:30'
  },
  {
    id: '3',
    title: 'Как приготовить идеальный стейк: секреты шеф-повара',
    channel: 'Кулинарный канал',
    views: '2.4M',
    uploadTime: '1 неделю назад',
    thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/57cb2a6d-4a80-496c-9ebb-3aa60e10415b.jpg',
    duration: '12:08'
  }
];

const Watch = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoId = searchParams.get('v') || '1';
  
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [commentText, setCommentText] = useState('');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-secondary"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex items-center gap-2">
            <Icon name="Play" size={32} className="text-primary" />
            <span className="text-xl font-bold">VideoHub</span>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
          <div>
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
              <img
                src={MOCK_VIDEO.thumbnail}
                alt={MOCK_VIDEO.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-xl font-bold mb-3">{MOCK_VIDEO.title}</h1>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {MOCK_VIDEO.channel[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{MOCK_VIDEO.channel}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_VIDEO.subscribers} подписчиков</p>
                </div>
                <Button
                  variant={subscribed ? 'secondary' : 'default'}
                  className="ml-4 rounded-full"
                  onClick={() => setSubscribed(!subscribed)}
                >
                  {subscribed ? 'Вы подписаны' : 'Подписаться'}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  className="rounded-full gap-2"
                  onClick={() => setLiked(!liked)}
                >
                  <Icon name={liked ? 'ThumbsUp' : 'ThumbsUp'} size={20} className={liked ? 'fill-current' : ''} />
                  {MOCK_VIDEO.likes}
                </Button>
                <Button variant="secondary" className="rounded-full gap-2">
                  <Icon name="Share2" size={20} />
                  Поделиться
                </Button>
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4 mb-6">
              <div className="flex gap-4 text-sm font-semibold mb-2">
                <span>{MOCK_VIDEO.views} просмотров</span>
                <span>{MOCK_VIDEO.uploadDate}</span>
              </div>
              <p className={`text-sm ${!showFullDescription ? 'line-clamp-2' : ''}`}>
                {MOCK_VIDEO.description}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 p-0 h-auto font-semibold"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Свернуть' : 'Ещё'}
              </Button>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-4">Комментарии ({MOCK_COMMENTS.length})</h2>
              
              <div className="flex gap-3 mb-6">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Введите комментарий..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="bg-transparent border-b border-border rounded-none resize-none min-h-[40px] p-0 focus-visible:ring-0"
                  />
                  {commentText && (
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="ghost" size="sm" onClick={() => setCommentText('')}>
                        Отмена
                      </Button>
                      <Button size="sm">Отправить</Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {MOCK_COMMENTS.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted">
                        {comment.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm mb-2">{comment.text}</p>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="p-0 h-auto gap-1">
                          <Icon name="ThumbsUp" size={16} />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Icon name="ThumbsDown" size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          Ответить
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mb-4">Рекомендации</h2>
            <div className="space-y-3">
              {RECOMMENDED_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="flex gap-2 cursor-pointer group"
                  onClick={() => navigate(`/watch?v=${video.id}`)}
                >
                  <div className="relative w-40 flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{video.channel}</p>
                    <p className="text-xs text-muted-foreground">
                      {video.views} · {video.uploadTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
