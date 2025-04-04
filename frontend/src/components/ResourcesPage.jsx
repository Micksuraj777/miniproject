import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ResourcesPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('videos');
  const [searchTerm, setSearchTerm] = useState('');
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not a user
  if (!currentUser || currentUser.role !== 'user') {
    return <Navigate to="/auth" replace />;
  }

  // YouTube video URLs
  const videoUrls = [
    "https://youtu.be/Mh4AKjop5XE?si=jir1DY-m_ev1MybF",
    "https://youtu.be/6TXwBwVh_V8?si=DefOwqVk_WuQgph0",
    "https://youtu.be/O1y2oha-BkU?si=6H3B4m4jdnsUA8iK",
    "https://youtu.be/4OlId8Ll5HQ?si=9eDuSHA09YCpNTui"
  ];

  // Fetch video data from YouTube
  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        // Extract video IDs from youtu.be URLs
        const simulatedData = videoUrls.map((url, index) => {
          // Handle youtu.be format URLs
          let videoId;
          if (url.includes('youtu.be')) {
            // Extract ID from youtu.be/VIDEO_ID?si=PARAMETER format
            videoId = url.split('youtu.be/')[1]?.split('?')[0];
          } else {
            // Handle regular youtube.com URLs
            videoId = url.split('v=')[1]?.split('&')[0];
          }
          
          return {
            id: index + 1,
            videoId,
            url,
            title: "Loading...",
            description: "Loading...",
            source: "Loading...",
            thumbnailUrl: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : ''
          };
        });
        
        setVideoData(simulatedData);
        
        // Simulate API response with setTimeout
        setTimeout(() => {
          const updatedData = [
            {
              id: 1,
              videoId: "Mh4AKjop5XE",
              url: "https://youtu.be/Mh4AKjop5XE?si=jir1DY-m_ev1MybF",
              title: "Corneal Transplant Surgery: What to Expect",
              description: "This video explains the corneal transplant procedure, recovery process, and what patients can expect before and after surgery.",
              source: "EyeSight Institute",
              thumbnailUrl: "https://img.youtube.com/vi/Mh4AKjop5XE/maxresdefault.jpg"
            },
            {
              id: 2,
              videoId: "6TXwBwVh_V8",
              url: "https://youtu.be/6TXwBwVh_V8?si=DefOwqVk_WuQgph0",
              title: "Understanding Different Types of Corneal Transplants",
              description: "Learn about the various types of corneal transplant procedures including DMEK, DSEK, and PKP, and which might be right for your condition.",
              source: "Vision Academy",
              thumbnailUrl: "https://img.youtube.com/vi/6TXwBwVh_V8/maxresdefault.jpg"
            },
            {
              id: 3,
              videoId: "_cQo-CndqCY",
              url: "https://youtu.be/_cQo-CndqCY?si=97NnnCVW7SeUZh4A",
              title: "My Corneal Transplant Journey: Patient Story",
              description: "A patient shares their personal experience with keratoconus diagnosis, corneal transplantation, and recovery journey.",
              source: "Eye Health Channel",
              thumbnailUrl: "https://img.youtube.com/vi/_cQo-CndqCY/maxresdefault.jpg"
            },
            {
              id: 4,
              videoId: "4OlId8Ll5HQ",
              url: "https://youtu.be/4OlId8Ll5HQ?si=9eDuSHA09YCpNTui",
              title: "Innovations in Corneal Transplantation",
              description: "Discover the latest technological advances and surgical techniques in corneal transplantation that are improving outcomes for patients.",
              source: "Medical Innovations Today",
              thumbnailUrl: "https://img.youtube.com/vi/4OlId8Ll5HQ/maxresdefault.jpg"
            }
          ];
          setVideoData(updatedData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching video data:", error);
        setLoading(false);
      }
    };

    fetchVideoData();
  }, []);

  // Resources data
  const resources = {
    videos: videoData,
    articles: [
      {
        id: 1,
        title: "Corneal Transplantation: What Patients Need to Know",
        source: "National Eye Institute",
        date: "March 15, 2023",
        url: "https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/corneal-conditions",
        description: "Comprehensive guide to corneal transplantation including preparation, procedure details, and recovery expectations."
      },
      {
        id: 2,
        title: "Types of Corneal Transplants: Which One Is Right for You?",
        source: "American Academy of Ophthalmology",
        date: "January 8, 2023",
        url: "https://www.aao.org/eye-health/treatments/corneal-transplant-surgery",
        description: "Comparison of different corneal transplant techniques and their suitability for various conditions."
      },
      {
        id: 3,
        title: "Recovery After Corneal Transplant: Timeline and Tips",
        source: "Eye Surgery Today",
        date: "May 22, 2023",
        url: "https://www.aao.org/eye-health/treatments/corneal-transplant-surgery-recovery",
        description: "Detailed timeline of recovery after corneal transplantation with practical tips for optimal healing."
      },
      {
        id: 4,
        title: "Risks and Complications of Eye Tissue Transplantation",
        source: "Journal of Ophthalmology",
        date: "February 3, 2023",
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6057729/",
        description: "Scientific review of potential risks, complications, and management strategies in corneal transplantation."
      },
      {
        id: 5,
        title: "Artificial Corneas: The Future of Eye Transplantation",
        source: "Future Medicine",
        date: "April 11, 2023",
        url: "https://www.nature.com/articles/s41433-021-01687-8",
        description: "Exploration of artificial cornea development and its potential to revolutionize treatment for corneal blindness."
      }
    ],
    blogs: [
      {
        id: 1,
        title: "My Journey Through Corneal Transplantation",
        author: "Sarah Johnson",
        date: "June 5, 2023",
        url: "https://medium.com/@sarahjohnson/my-corneal-transplant-journey",
        description: "Personal account of a patient's experience with keratoconus and subsequent corneal transplantation."
      },
      {
        id: 2,
        title: "Life After Corneal Transplant: What to Expect",
        author: "Dr. Michael Chen",
        date: "April 18, 2023",
        url: "https://eyehealthblog.com/life-after-corneal-transplant",
        description: "An ophthalmologist's perspective on post-transplant lifestyle adjustments and long-term outcomes."
      },
      {
        id: 3,
        title: "Supporting a Loved One Through Eye Transplantation",
        author: "James Wilson",
        date: "May 30, 2023",
        url: "https://caregiverchronicles.org/supporting-eye-transplant-patient",
        description: "Advice for family members and caregivers supporting someone through corneal transplantation."
      },
      {
        id: 4,
        title: "From Donor to Recipient: The Journey of Corneal Tissue",
        author: "Eye Bank Association",
        date: "February 22, 2023",
        url: "https://eyebankassociation.org/donor-to-recipient-journey",
        description: "Behind-the-scenes look at how donated corneal tissue is processed, evaluated, and delivered for transplantation."
      }
    ]
  };

  // Filter resources based on search term
  const filteredResources = {
    videos: resources.videos.filter(video => 
      video.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      video.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    articles: resources.articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    blogs: resources.blogs.filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const tabVariants = {
    inactive: { 
      color: "#6B7280", 
      borderColor: "transparent" 
    },
    active: { 
      color: "#3B82F6", 
      borderColor: "#3B82F6",
      transition: { duration: 0.2 } 
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Eye Transplantation Resources</h1>
        <p className="text-lg text-gray-600">Educational videos, articles, and personal stories about eye tissue transplantation</p>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['videos', 'articles', 'blogs'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab ? "active" : "inactive"}
              whileHover={{ color: "#3B82F6" }}
            >
              {tab}
              {activeTab === tab && (
                <motion.span 
                  className="ml-2 bg-blue-100 text-blue-600 py-0.5 px-2 rounded-full text-xs"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {filteredResources[tab].length}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'videos' && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                  variants={itemVariants}
                >
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
                    <div className="relative pb-[56.25%] mb-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  </div>
                </motion.div>
              ))
            ) : filteredResources.videos.length > 0 ? (
              filteredResources.videos.map((video) => (
                <motion.div 
                  key={video.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{video.title}</h3>
                    <p className="text-sm text-blue-600 mb-2">{video.source}</p>
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="relative pb-[56.25%] mb-3">
                        <img 
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-30 transition-all">
                          <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </a>
                    <p className="text-gray-600 text-sm">{video.description}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No videos found matching your search.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'articles' && (
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredResources.articles.length > 0 ? (
              filteredResources.articles.map((article) => (
                <motion.div 
                  key={article.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="block p-6">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{article.title}</h3>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span className="text-blue-600">{article.source}</span>
                          <span className="mx-2">•</span>
                          <span>{article.date}</span>
                        </div>
                        <p className="text-gray-600">{article.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <span className="inline-flex rounded-md shadow-sm">
                          <span className="inline-flex items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Read Article
                            <svg className="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No articles found matching your search.</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'blogs' && (
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredResources.blogs.length > 0 ? (
              filteredResources.blogs.map((blog) => (
                <motion.div 
                  key={blog.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                >
                  <a href={blog.url} target="_blank" rel="noopener noreferrer" className="block p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{blog.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="text-blue-600">By {blog.author}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.date}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{blog.description}</p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      Read more
                      <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No blogs found matching your search.</p>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResourcesPage; 