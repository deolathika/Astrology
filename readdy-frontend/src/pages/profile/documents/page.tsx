import { useState } from 'react';
import Navigation from '../../../components/feature/Navigation';
import StarfieldBackground from '../../../components/feature/StarfieldBackground';
import Card from '../../../components/base/Card';
import Button from '../../../components/base/Button';

export default function ProfileDocuments() {
  const [userRole, setUserRole] = useState<'guest' | 'free' | 'premium' | 'admin'>('free');
  const [activeTab, setActiveTab] = useState('readings');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documentCategories = [
    { id: 'all', label: 'All Documents', count: 24 },
    { id: 'readings', label: 'Readings', count: 12 },
    { id: 'reports', label: 'Reports', count: 6 },
    { id: 'certificates', label: 'Certificates', count: 3 },
    { id: 'exports', label: 'Data Exports', count: 3 }
  ];

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Birth Chart Analysis',
      type: 'PDF',
      size: '2.4 MB',
      date: '2024-01-15',
      category: 'Astrology Reports',
      icon: 'ri-file-pdf-line',
      color: 'text-red-400',
      description: 'Complete natal chart interpretation with planetary positions'
    },
    // Add journal entries section
    {
      id: 'journal-section',
      name: 'Personal Journal',
      type: 'SECTION',
      category: 'Journal Entries',
      icon: 'ri-book-line',
      color: 'text-purple-400',
      description: 'Your saved cosmic insights and daily readings'
    }
  ]);

  // Get journal entries from localStorage or context
  const getJournalEntries = () => {
    try {
      const saved = localStorage.getItem('cosmicJournalEntries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const [journalEntries] = useState(getJournalEntries());

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory;
    const matchesSearch = doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (document: any) => {
    // Simulate download
    console.log(`Downloading ${document.title}`);
  };

  const handleShare = (document: any) => {
    // Simulate share
    console.log(`Sharing ${document.title}`);
  };

  const handleDelete = (documentId: number) => {
    // Simulate delete
    console.log(`Deleting document ${documentId}`);
  };

  return (
    <div className="min-h-screen relative">
      <StarfieldBackground />
      <Navigation userRole={userRole} />
      
      <div className="relative z-10 pt-20 pb-12">
        {/* Header */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Documents
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Access and manage your cosmic readings, reports, and certificates
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-file-text-line text-xl text-white"></i>
                </div>
                <div className="text-2xl font-bold text-white mb-1">24</div>
                <p className="text-gray-300 text-sm">Total Documents</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-download-line text-xl text-white"></i>
                </div>
                <div className="text-2xl font-bold text-white mb-1">156</div>
                <p className="text-gray-300 text-sm">Downloads</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-hard-drive-line text-xl text-white"></i>
                </div>
                <div className="text-2xl font-bold text-white mb-1">18.4</div>
                <p className="text-gray-300 text-sm">MB Used</p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-calendar-line text-xl text-white"></i>
                </div>
                <div className="text-2xl font-bold text-white mb-1">30</div>
                <p className="text-gray-300 text-sm">Days Retention</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="px-4 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>

                {/* Category Filter */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300 text-sm">Filter by:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-8"
                  >
                    {documentCategories.map((category) => (
                      <option key={category.id} value={category.id} className="bg-gray-800">
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <i className="ri-upload-line mr-2"></i>
                    Upload
                  </Button>
                  <Button variant="primary" size="sm">
                    <i className="ri-add-line mr-2"></i>
                    New Document
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {filteredDocuments.length === 0 ? (
              <Card className="p-12 text-center">
                <i className="ri-file-search-line text-6xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-bold text-white mb-2">No Documents Found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                <Button variant="primary">
                  <i className="ri-refresh-line mr-2"></i>
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocuments.map((document) => (
                  <Card key={document.id} className="p-6 hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${document.color} rounded-lg flex items-center justify-center`}>
                        <i className={`${document.icon} text-xl text-white`}></i>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleShare(document)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <i className="ri-share-line text-sm"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(document.id)}
                          className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <i className="ri-delete-bin-line text-sm"></i>
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{document.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{document.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {document.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Document Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span>{document.format}</span>
                        <span>{document.size}</span>
                      </div>
                      <span>{new Date(document.date).toLocaleDateString()}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownload(document)}
                      >
                        <i className="ri-download-line mr-2"></i>
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        <i className="ri-eye-line"></i>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredDocuments.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="ghost" size="lg">
                  <i className="ri-arrow-down-line mr-2"></i>
                  Load More Documents
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Journal Entries Section */}
        {filteredDocuments.some(doc => doc.category === 'Journal Entries') && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <i className="ri-book-line mr-2 text-purple-400"></i>
                Personal Journal ({journalEntries.length} entries)
              </h3>
              <Button variant="ghost" size="sm">
                <i className="ri-download-line mr-2"></i>
                Export Journal
              </Button>
            </div>
            
            {journalEntries.length === 0 ? (
              <Card className="p-8 text-center">
                <i className="ri-book-line text-4xl text-gray-400 mb-4"></i>
                <h4 className="text-xl font-semibold text-white mb-2">No Journal Entries Yet</h4>
                <p className="text-gray-400 mb-4">Start saving your cosmic insights and daily readings to build your personal journal.</p>
                <Button variant="primary" onClick={() => navigate('/')}>
                  <i className="ri-add-line mr-2"></i>
                  Get Daily Reading
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {journalEntries.slice(0, 6).map((entry: any) => (
                  <Card key={entry.id} className="p-4 hover:bg-white/15 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${entry.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <i className={`${entry.icon} text-white`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium mb-1 truncate">{entry.title}</h4>
                        <p className="text-sm text-gray-300 line-clamp-2 mb-2">{entry.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{new Date(entry.date).toLocaleDateString()}</span>
                          <span className="capitalize">{entry.type.replace('-', ' ')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <i className="ri-share-line text-sm"></i>
                        </button>
                        <button className="p-1 text-gray-400 hover:text-white transition-colors">
                          <i className="ri-download-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {journalEntries.length > 6 && (
              <div className="text-center mt-4">
                <Button variant="ghost">
                  <i className="ri-more-line mr-2"></i>
                  View All Journal Entries ({journalEntries.length})
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Storage Info */}
        <section className="px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Storage Usage</h3>
                <span className="text-sm text-gray-400">18.4 MB of 100 MB used</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '18.4%' }}></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-400">Documents</p>
                  <p className="text-lg font-semibold text-white">24</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Available Space</p>
                  <p className="text-lg font-semibold text-white">81.6 MB</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Retention Period</p>
                  <p className="text-lg font-semibold text-white">30 Days</p>
                </div>
              </div>

              {userRole === 'guest' && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Upgrade for More Storage</h4>
                      <p className="text-sm text-gray-300">Get 1GB storage and unlimited document retention</p>
                    </div>
                    <Button variant="cosmic" size="sm">
                      Upgrade
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
