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
      <header className="border-b border-border/50 backdrop-blur-md bg-background/80 px-6 py-3 flex items-center justify-between animate-fade-in sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 animate-glow">
            <Icon name="Zap" size={18} className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">DevAssistant</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hover:bg-white/5 transition-all duration-300">
            <Icon name="Settings" size={18} className="mr-2" />
            Настройки
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-white/5 transition-all duration-300">
            <Icon name="BookOpen" size={18} className="mr-2" />
            Документация
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full border-r border-border/50 flex flex-col backdrop-blur-sm bg-background/50">
              <div className="p-4 border-b border-border/50">
                <Button className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105" onClick={() => setActiveTab('projects')}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Новый проект
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 tracking-wider">Проекты</h3>
                  {projects.map((project, idx) => (
                    <Card
                      key={project.id}
                      className={`p-3 cursor-pointer transition-all duration-300 hover:bg-white/5 backdrop-blur-sm border-border/50 animate-slide-in-left ${
                        selectedProject?.id === project.id ? 'bg-white/10 border-primary/30 shadow-lg shadow-primary/10' : ''
                      }`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                      onClick={() => {
                        setSelectedProject(project);
                        setActiveTab('editor');
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-secondary to-secondary/50 rounded flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                          <Icon name={getProjectIcon(project.type)} size={16} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{project.name}</h4>
                            <div className={`w-2 h-2 rounded-full ${project.status === 'running' ? 'bg-green-500 animate-glow' : 'bg-gray-500'}`} />
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

          <ResizableHandle className="bg-border/50 hover:bg-primary/50 transition-colors duration-300" />

          <ResizablePanel defaultSize={80}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="border-b border-border/50 backdrop-blur-md bg-background/50 px-6">
                <TabsList className="bg-transparent border-0">
                  <TabsTrigger value="projects" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none transition-all duration-300">
                    <Icon name="Folder" size={16} className="mr-2" />
                    Проекты
                  </TabsTrigger>
                  <TabsTrigger value="editor" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none transition-all duration-300">
                    <Icon name="Code" size={16} className="mr-2" />
                    Редактор
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none transition-all duration-300">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Превью
                  </TabsTrigger>
                  <TabsTrigger value="database" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none transition-all duration-300">
                    <Icon name="Database" size={16} className="mr-2" />
                    База данных
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="projects" className="flex-1 m-0 p-6 animate-fade-in">
                <div className="max-w-4xl">
                  <h2 className="text-2xl font-semibold mb-2">Создать новый проект</h2>
                  <p className="text-muted-foreground mb-6">Выберите тип приложения для начала разработки</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: 'Globe', title: 'Web приложение', desc: 'React SPA с live preview' },
                      { icon: 'MessageCircle', title: 'Telegram бот', desc: 'Bot API с webhook' },
                      { icon: 'Server', title: 'REST API', desc: 'Backend с PostgreSQL' }
                    ].map((item, idx) => (
                      <Card key={idx} className="p-6 hover:bg-white/5 cursor-pointer transition-all duration-300 group backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:scale-105 animate-fade-in-scale" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-orange-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-orange-600/30 transition-all duration-300 backdrop-blur-sm">
                          <Icon name={item.icon as any} size={24} className="text-primary group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <h3 className="text-lg font-semibold mb-4">Последние проекты</h3>
                    <div className="space-y-3">
                      {projects.map((project, idx) => (
                        <Card key={project.id} className="p-4 hover:bg-white/5 cursor-pointer transition-all duration-300 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 animate-slide-in-left" style={{ animationDelay: `${idx * 0.1}s` }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary/50 rounded flex items-center justify-center backdrop-blur-sm">
                                <Icon name={getProjectIcon(project.type)} size={20} className="text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{project.name}</h4>
                                <p className="text-sm text-muted-foreground">{project.lastModified}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={project.status === 'running' ? 'default' : 'secondary'} className={project.status === 'running' ? 'bg-gradient-to-r from-primary to-orange-600' : ''}>
                                {project.status === 'running' ? 'Запущен' : 'Остановлен'}
                              </Badge>
                              <Button variant="ghost" size="sm" className="hover:bg-white/5 transition-all duration-300 hover:scale-110">
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

              <TabsContent value="editor" className="flex-1 m-0 animate-fade-in">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  <ResizablePanel defaultSize={70}>
                    <div className="h-full flex flex-col">
                      <div className="border-b border-border/50 backdrop-blur-sm bg-background/50 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon name="FileCode" size={16} className="text-primary" />
                          <span className="text-sm font-mono text-muted-foreground">src/App.tsx</span>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-white/5 transition-all duration-300 hover:scale-105">
                          <Icon name="Play" size={16} className="mr-2 text-primary" />
                          Запустить
                        </Button>
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-card to-card/50 p-4 backdrop-blur-sm">
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

                  <ResizableHandle className="bg-border/50 hover:bg-primary/50 transition-colors duration-300" />

                  <ResizablePanel defaultSize={30} minSize={25}>
                    <div className="h-full flex flex-col border-l border-border/50 backdrop-blur-sm bg-background/50">
                      <div className="border-b border-border/50 px-4 py-2 flex items-center justify-between backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary to-orange-600 rounded flex items-center justify-center animate-glow">
                            <Icon name="Bot" size={14} className="text-primary-foreground" />
                          </div>
                          <span className="text-sm font-semibold">AI Ассистент</span>
                        </div>
                      </div>
                      
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'justify-end' : ''}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                              {msg.role === 'assistant' && (
                                <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                                  <Icon name="Bot" size={16} className="text-primary-foreground" />
                                </div>
                              )}
                              <div className={`rounded-lg px-4 py-2 max-w-[85%] backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                                msg.role === 'user' ? 'bg-gradient-to-r from-primary to-orange-600 text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 border border-border/50'
                              }`}>
                                <p className="text-sm">{msg.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="border-t border-border/50 p-4 backdrop-blur-sm bg-background/50">
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
                            className="min-h-[60px] resize-none backdrop-blur-sm bg-white/5 border-border/50 focus:border-primary/50 transition-all duration-300"
                          />
                          <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0 bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-110">
                            <Icon name="Send" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </TabsContent>

              <TabsContent value="preview" className="flex-1 m-0 p-6 animate-fade-in">
                <Card className="h-full flex items-center justify-center backdrop-blur-sm bg-gradient-to-br from-card to-card/50 border-border/50">
                  <div className="text-center animate-fade-in-scale">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Icon name="Eye" size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Live Preview</h3>
                    <p className="text-muted-foreground">Здесь будет отображаться ваше приложение</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="database" className="flex-1 m-0 p-6 animate-fade-in">
                <div className="max-w-4xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">PostgreSQL Database</h2>
                      <p className="text-muted-foreground">Управление таблицами и данными</p>
                    </div>
                    <Button className="bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
                      <Icon name="Plus" size={18} className="mr-2" />
                      Новая таблица
                    </Button>
                  </div>

                  <Card className="p-4 mb-4 backdrop-blur-sm bg-gradient-to-br from-card to-card/50 border-border/50 animate-fade-in-scale">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-orange-600/20 rounded-lg flex items-center justify-center">
                        <Icon name="Database" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Статус подключения</h4>
                        <p className="text-sm text-muted-foreground">Подключено к project_db</p>
                      </div>
                      <Badge className="ml-auto bg-gradient-to-r from-primary to-orange-600 animate-glow">Активно</Badge>
                    </div>
                  </Card>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'users', cols: 5, rows: 142, fields: ['id', 'email', 'name'] },
                      { name: 'projects', cols: 7, rows: 38, fields: ['id', 'name', 'type'] }
                    ].map((table, idx) => (
                      <Card key={idx} className="p-4 hover:bg-white/5 cursor-pointer transition-all duration-300 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 animate-fade-in-scale" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex items-center gap-3 mb-3">
                          <Icon name="Table" size={18} className="text-primary" />
                          <h4 className="font-semibold">{table.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{table.cols} столбцов · {table.rows} записи</p>
                        <div className="flex gap-2">
                          {table.fields.map((field, i) => (
                            <Badge key={i} variant="secondary" className="text-xs backdrop-blur-sm bg-white/5">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))}
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
