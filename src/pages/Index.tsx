import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

type Project = {
  id: string;
  name: string;
  type: 'web' | 'telegram' | 'api';
  status: 'running' | 'stopped';
  lastModified: string;
};

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Привет! Я AI-ассистент для разработки. Опишите приложение или бота, который хотите создать.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('projects');

  const projects: Project[] = [
    { id: '1', name: 'E-commerce Landing', type: 'web', status: 'running', lastModified: '2 часа назад' },
    { id: '2', name: 'Support Bot', type: 'telegram', status: 'running', lastModified: '1 день назад' },
    { id: '3', name: 'REST API Service', type: 'api', status: 'stopped', lastModified: '3 дня назад' },
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([...chatMessages, 
      { role: 'user', content: inputMessage },
      { role: 'assistant', content: 'Понял! Начинаю разработку приложения. Сейчас создам структуру проекта...' }
    ]);
    setInputMessage('');
  };

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'web': return 'Globe';
      case 'telegram': return 'MessageCircle';
      case 'api': return 'Server';
      default: return 'FileCode';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={18} className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold">DevAssistant</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={18} className="mr-2" />
            Настройки
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="BookOpen" size={18} className="mr-2" />
            Документация
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <Button className="w-full" onClick={() => setActiveTab('projects')}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Новый проект
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Проекты</h3>
                  {projects.map((project) => (
                    <Card
                      key={project.id}
                      className={`p-3 cursor-pointer transition-colors hover:bg-accent ${
                        selectedProject?.id === project.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveTab('editor');
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                          <Icon name={getProjectIcon(project.type)} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{project.name}</h4>
                            <div className={`w-2 h-2 rounded-full ${project.status === 'running' ? 'bg-green-500' : 'bg-gray-500'}`} />
                          </div>
                          <p className="text-xs text-muted-foreground">{project.lastModified}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={80}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b border-border px-6">
                <TabsList className="bg-transparent border-0">
                  <TabsTrigger value="projects" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <Icon name="Folder" size={16} className="mr-2" />
                    Проекты
                  </TabsTrigger>
                  <TabsTrigger value="editor" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <Icon name="Code" size={16} className="mr-2" />
                    Редактор
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Превью
                  </TabsTrigger>
                  <TabsTrigger value="database" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                    <Icon name="Database" size={16} className="mr-2" />
                    База данных
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="projects" className="flex-1 m-0 p-6">
                <div className="max-w-4xl">
                  <h2 className="text-2xl font-semibold mb-2">Создать новый проект</h2>
                  <p className="text-muted-foreground mb-6">Выберите тип приложения для начала разработки</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <Card className="p-6 hover:bg-accent cursor-pointer transition-colors group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon name="Globe" size={24} className="text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Web приложение</h3>
                      <p className="text-sm text-muted-foreground">React SPA с live preview</p>
                    </Card>

                    <Card className="p-6 hover:bg-accent cursor-pointer transition-colors group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon name="MessageCircle" size={24} className="text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Telegram бот</h3>
                      <p className="text-sm text-muted-foreground">Bot API с webhook</p>
                    </Card>

                    <Card className="p-6 hover:bg-accent cursor-pointer transition-colors group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon name="Server" size={24} className="text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">REST API</h3>
                      <p className="text-sm text-muted-foreground">Backend с PostgreSQL</p>
                    </Card>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold mb-4">Последние проекты</h3>
                    <div className="space-y-3">
                      {projects.map((project) => (
                        <Card key={project.id} className="p-4 hover:bg-accent cursor-pointer transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-secondary rounded flex items-center justify-center">
                                <Icon name={getProjectIcon(project.type)} size={20} />
                              </div>
                              <div>
                                <h4 className="font-medium">{project.name}</h4>
                                <p className="text-sm text-muted-foreground">{project.lastModified}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={project.status === 'running' ? 'default' : 'secondary'}>
                                {project.status === 'running' ? 'Запущен' : 'Остановлен'}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <Icon name="ExternalLink" size={16} />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="editor" className="flex-1 m-0">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  <ResizablePanel defaultSize={70}>
                    <div className="h-full flex flex-col">
                      <div className="border-b border-border px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon name="FileCode" size={16} className="text-muted-foreground" />
                          <span className="text-sm font-mono">src/App.tsx</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Icon name="Play" size={16} className="mr-2" />
                          Запустить
                        </Button>
                      </div>
                      <div className="flex-1 bg-card p-4">
                        <pre className="font-mono text-sm text-muted-foreground">
                          <code>{`import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <h1>Hello DevAssistant</h1>
    </div>
  );
}

export default App;`}</code>
                        </pre>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle />

                  <ResizablePanel defaultSize={30} minSize={25}>
                    <div className="h-full flex flex-col border-l border-border">
                      <div className="border-b border-border px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon name="Bot" size={16} className="text-primary" />
                          <span className="text-sm font-semibold">AI Ассистент</span>
                        </div>
                      </div>
                      
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                              {msg.role === 'assistant' && (
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Icon name="Bot" size={16} className="text-primary-foreground" />
                                </div>
                              )}
                              <div className={`rounded-lg px-4 py-2 max-w-[85%] ${
                                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                              }`}>
                                <p className="text-sm">{msg.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="border-t border-border p-4">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Опишите что нужно сделать..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            className="min-h-[60px] resize-none"
                          />
                          <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
                            <Icon name="Send" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </TabsContent>

              <TabsContent value="preview" className="flex-1 m-0 p-6">
                <Card className="h-full flex items-center justify-center bg-card">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Eye" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
                    <p className="text-muted-foreground">Здесь будет отображаться ваше приложение</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="database" className="flex-1 m-0 p-6">
                <div className="max-w-4xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">PostgreSQL Database</h2>
                      <p className="text-muted-foreground">Управление таблицами и данными</p>
                    </div>
                    <Button>
                      <Icon name="Plus" size={18} className="mr-2" />
                      Новая таблица
                    </Button>
                  </div>

                  <Card className="p-4 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Icon name="Database" size={20} className="text-primary" />
                      <div>
                        <h4 className="font-semibold">Статус подключения</h4>
                        <p className="text-sm text-muted-foreground">Подключено к project_db</p>
                      </div>
                      <Badge className="ml-auto">Активно</Badge>
                    </div>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 hover:bg-accent cursor-pointer transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="Table" size={18} className="text-primary" />
                        <h4 className="font-semibold">users</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">5 столбцов · 142 записи</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">id</Badge>
                        <Badge variant="secondary" className="text-xs">email</Badge>
                        <Badge variant="secondary" className="text-xs">name</Badge>
                      </div>
                    </Card>

                    <Card className="p-4 hover:bg-accent cursor-pointer transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon name="Table" size={18} className="text-primary" />
                        <h4 className="font-semibold">projects</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">7 столбцов · 38 записей</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">id</Badge>
                        <Badge variant="secondary" className="text-xs">name</Badge>
                        <Badge variant="secondary" className="text-xs">type</Badge>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Index;
