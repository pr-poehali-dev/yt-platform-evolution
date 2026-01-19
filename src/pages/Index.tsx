import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadTime: string;
  thumbnail: string;
  duration: string;
}

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Обзор новых технологий 2026: что изменится в мире IT',
    channel: 'Tech Review',
    channelAvatar: '',
    views: '1.2M',
    uploadTime: '2 дня назад',
    thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/3ed022f1-ff42-4eb3-b66c-e912edcbb1b2.jpg',
    duration: '15:24'
  },
  {
    id: '2',
    title: 'LIVE: Стрим по новой игре - прохождение с нуля',
    channel: 'Gaming Pro',
    channelAvatar: '',
    views: '850K',
    uploadTime: '5 часов назад',
    thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/89f30c15-2f58-450a-a846-eb95a3b55f54.jpg',
    duration: '2:15:30'
  },
  {
    id: '3',
    title: 'Как приготовить идеальный стейк: секреты шеф-повара',
    channel: 'Кулинарный канал',
    channelAvatar: '',
    views: '2.4M',
    uploadTime: '1 неделю назад',
    thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/57cb2a6d-4a80-496c-9ebb-3aa60e10415b.jpg',
    duration: '12:08'
  },
  {
    id: '4',
    title: 'Обзор новых технологий 2026: что изменится в мире IT',
    channel: 'Tech Review',
    channelAvatar: '',
    views: '1.2M',
    uploadTime: '2 дня назад',
    thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/3ed022f1-ff42-4eb3-b66c-e912edcbb1b2.jpg',
    duration: '15:24'
  },
  {
    id: '5',
    title: 'LIVE: Стрим по новой игре - прохождение с нуля',
    channel: 'Gaming Pro',
    channelAvatar: '',
    views: '850K',
    uploadTime: '5 часов назад',
    thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/89f30c15-2f58-450a-a846-eb95a3b55f54.jpg',
    duration: '2:15:30'
  },
  {
    id: '6',
    title: 'Как приготовить идеальный стейк: секреты шеф-повара',
    channel: 'Кулинарный канал',
    channelAvatar: '',
    views: '2.4M',
    uploadTime: '1 неделю назад',
    thumbnail: 'https://cdn.poehali.dev/projects/2caa20ec-8334-4b9f-8c36-e846c994929a/files/57cb2a6d-4a80-496c-9ebb-3aa60e10415b.jpg',
    duration: '12:08'
  }
];

const SIDEBAR_CHANNELS = [
  { name: 'Tech Review', avatar: '', subscribers: '2.5M' },
  { name: 'Gaming Pro', avatar: '', subscribers: '1.8M' },
  { name: 'Кулинарный канал', avatar: '', subscribers: '3.2M' },
  { name: 'Влог Канал', avatar: '', subscribers: '980K' },
  { name: 'Образование', avatar: '', subscribers: '1.5M' }
];

const Index = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-secondary"
            >
              <Icon name="Menu" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Play" size={32} className="text-primary" />
              <span className="text-xl font-bold">VideoHub</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary border-border pl-4 pr-12 py-2 rounded-full"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-muted"
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Icon name="Video" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Icon name="Bell" size={24} />
            </Button>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`fixed left-0 top-[57px] h-[calc(100vh-57px)] bg-background border-r border-border transition-all duration-300 overflow-y-auto ${
            sidebarOpen ? 'w-60' : 'w-0 -ml-60'
          }`}
        >
          <nav className="p-3 space-y-1">
            <Button
              variant={activeSection === 'home' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-4 hover:bg-secondary"
              onClick={() => setActiveSection('home')}
            >
              <Icon name="Home" size={24} />
              <span>Главная</span>
            </Button>
            <Button
              variant={activeSection === 'trending' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-4 hover:bg-secondary"
              onClick={() => setActiveSection('trending')}
            >
              <Icon name="TrendingUp" size={24} />
              <span>В тренде</span>
            </Button>
            <Button
              variant={activeSection === 'subscriptions' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-4 hover:bg-secondary"
              onClick={() => setActiveSection('subscriptions')}
            >
              <Icon name="Folder" size={24} />
              <span>Подписки</span>
            </Button>
            <Button
              variant={activeSection === 'library' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-4 hover:bg-secondary"
              onClick={() => setActiveSection('library')}
            >
              <Icon name="Library" size={24} />
              <span>Библиотека</span>
            </Button>
            <Button
              variant={activeSection === 'history' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-4 hover:bg-secondary"
              onClick={() => setActiveSection('history')}
            >
              <Icon name="Clock" size={24} />
              <span>История</span>
            </Button>

            <div className="pt-4 pb-2 border-t border-border mt-4">
              <h3 className="px-3 text-sm font-semibold text-muted-foreground mb-2">ПОДПИСКИ</h3>
              {SIDEBAR_CHANNELS.map((channel) => (
                <Button
                  key={channel.name}
                  variant="ghost"
                  className="w-full justify-start gap-3 hover:bg-secondary"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {channel.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm truncate">{channel.name}</span>
                </Button>
              ))}
            </div>
          </nav>
        </aside>

        <main
          className={`flex-1 transition-all duration-300 pt-6 ${
            sidebarOpen ? 'ml-60' : 'ml-0'
          }`}
        >
          <div className="px-6">
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
              <Button variant="secondary" size="sm" className="rounded-full whitespace-nowrap">
                Все
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap hover:bg-secondary">
                Музыка
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap hover:bg-secondary">
                Игры
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap hover:bg-secondary">
                Новости
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap hover:bg-secondary">
                Прямые трансляции
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full whitespace-nowrap hover:bg-secondary">
                Образование
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {MOCK_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer animate-fade-in"
                  onClick={() => navigate(`/watch?v=${video.id}`)}
                >
                  <div className="relative rounded-xl overflow-hidden mb-3">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9 flex-shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {video.channel[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{video.channel}</p>
                      <p className="text-sm text-muted-foreground">
                        {video.views} просмотров · {video.uploadTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;