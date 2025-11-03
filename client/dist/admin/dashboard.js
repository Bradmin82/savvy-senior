const { createApp } = Vue;

createApp({
  data() {
    return {
      currentView: 'dashboard',
      adminUser: JSON.parse(localStorage.getItem('adminUser') || '{}'),
      token: localStorage.getItem('adminToken'),
      
      // Stats
      stats: {
        blogPosts: 0,
        pages: 0,
        inquiries: 0,
        assets: 0
      },
      
      // Blog
      blogPosts: [],
      currentBlogPost: {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Savvy Senior Team',
        featuredImage: '',
        published: false
      },
      editingBlogPostId: null,
      
      // Pages
      pages: [],
      currentPage: {
        title: '',
        slug: '',
        content: '',
        metaDescription: '',
        published: false
      },
      editingPageId: null,
      
      // Assets
      assets: [],
      showAssetPicker: false,
      assetPickerTarget: null,
      
      // Inquiries
      inquiries: []
    };
  },
  
  computed: {
    viewTitle() {
      const titles = {
        'dashboard': 'Dashboard',
        'blog-list': 'Blog Posts',
        'blog-editor': this.editingBlogPostId ? 'Edit Blog Post' : 'New Blog Post',
        'pages-list': 'Pages',
        'page-editor': this.editingPageId ? 'Edit Page' : 'New Page',
        'assets': 'Assets Manager',
        'inquiries': 'Contact Inquiries'
      };
      return titles[this.currentView] || 'Admin';
    },
    
    markdownPreview() {
      if (typeof marked !== 'undefined') {
        return marked.parse(this.currentBlogPost.content || '');
      }
      return this.currentBlogPost.content;
    }
  },
  
  mounted() {
    if (!this.token) {
      window.location.href = '/admin/login.html';
      return;
    }
    
    this.loadDashboardData();
  },
  
  methods: {
    async apiRequest(url, options = {}) {
      const defaultOptions = {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login.html';
        return;
      }
      
      return response;
    },
    
    async loadDashboardData() {
      await Promise.all([
        this.loadBlogPosts(),
        this.loadPages(),
        this.loadAssets(),
        this.loadInquiries()
      ]);
      
      this.stats = {
        blogPosts: this.blogPosts.length,
        pages: this.pages.length,
        inquiries: this.inquiries.length,
        assets: this.assets.length
      };
    },
    
    // Blog Methods
    async loadBlogPosts() {
      try {
        const response = await this.apiRequest('/api/blog/all');
        this.blogPosts = await response.json();
      } catch (error) {
        console.error('Error loading blog posts:', error);
      }
    },
    
    createNewBlogPost() {
      this.currentBlogPost = {
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: 'Savvy Senior Team',
        featuredImage: '',
        published: false
      };
      this.editingBlogPostId = null;
      this.currentView = 'blog-editor';
    },
    
    async editBlogPost(post) {
      try {
        const response = await this.apiRequest(`/api/blog/edit/${post._id}`);
        this.currentBlogPost = await response.json();
        this.editingBlogPostId = post._id;
        this.currentView = 'blog-editor';
      } catch (error) {
        console.error('Error loading blog post:', error);
        alert('Error loading blog post');
      }
    },
    
    async saveBlogPost() {
      try {
        const url = this.editingBlogPostId 
          ? `/api/blog/${this.editingBlogPostId}`
          : '/api/blog';
        
        const method = this.editingBlogPostId ? 'PUT' : 'POST';
        
        const response = await this.apiRequest(url, {
          method,
          body: JSON.stringify(this.currentBlogPost)
        });
        
        if (response.ok) {
          alert('Blog post saved successfully!');
          await this.loadBlogPosts();
          this.currentView = 'blog-list';
        } else {
          const error = await response.json();
          alert('Error saving blog post: ' + error.message);
        }
      } catch (error) {
        console.error('Error saving blog post:', error);
        alert('Error saving blog post');
      }
    },
    
    async deleteBlogPost(id) {
      if (!confirm('Are you sure you want to delete this blog post?')) return;
      
      try {
        const response = await this.apiRequest(`/api/blog/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Blog post deleted successfully!');
          await this.loadBlogPosts();
        }
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert('Error deleting blog post');
      }
    },
    
    generateSlug() {
      this.currentBlogPost.slug = this.currentBlogPost.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    },
    
    // Pages Methods
    async loadPages() {
      try {
        const response = await this.apiRequest('/api/pages');
        this.pages = await response.json();
      } catch (error) {
        console.error('Error loading pages:', error);
      }
    },
    
    createNewPage() {
      this.currentPage = {
        title: '',
        slug: '',
        content: '',
        metaDescription: '',
        published: false
      };
      this.editingPageId = null;
      this.currentView = 'page-editor';
    },
    
    async editPage(page) {
      try {
        const response = await this.apiRequest(`/api/pages/edit/${page._id}`);
        this.currentPage = await response.json();
        this.editingPageId = page._id;
        this.currentView = 'page-editor';
      } catch (error) {
        console.error('Error loading page:', error);
        alert('Error loading page');
      }
    },
    
    async savePage() {
      try {
        const url = this.editingPageId 
          ? `/api/pages/${this.editingPageId}`
          : '/api/pages';
        
        const method = this.editingPageId ? 'PUT' : 'POST';
        
        const response = await this.apiRequest(url, {
          method,
          body: JSON.stringify(this.currentPage)
        });
        
        if (response.ok) {
          alert('Page saved successfully!');
          await this.loadPages();
          this.currentView = 'pages-list';
        } else {
          const error = await response.json();
          alert('Error saving page: ' + error.message);
        }
      } catch (error) {
        console.error('Error saving page:', error);
        alert('Error saving page');
      }
    },
    
    async deletePage(id) {
      if (!confirm('Are you sure you want to delete this page?')) return;
      
      try {
        const response = await this.apiRequest(`/api/pages/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Page deleted successfully!');
          await this.loadPages();
        }
      } catch (error) {
        console.error('Error deleting page:', error);
        alert('Error deleting page');
      }
    },
    
    generatePageSlug() {
      this.currentPage.slug = this.currentPage.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    },
    
    // Assets Methods
    async loadAssets() {
      try {
        const response = await this.apiRequest('/api/upload');
        this.assets = await response.json();
      } catch (error) {
        console.error('Error loading assets:', error);
      }
    },
    
    async uploadFile(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          body: formData
        });
        
        if (response.ok) {
          alert('File uploaded successfully!');
          await this.loadAssets();
          this.stats.assets = this.assets.length;
        } else {
          const error = await response.json();
          alert('Error uploading file: ' + error.message);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file');
      }
      
      event.target.value = '';
    },
    
    async deleteAsset(filename) {
      if (!confirm('Are you sure you want to delete this asset?')) return;
      
      try {
        const response = await this.apiRequest(`/api/upload/${filename}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Asset deleted successfully!');
          await this.loadAssets();
          this.stats.assets = this.assets.length;
        }
      } catch (error) {
        console.error('Error deleting asset:', error);
        alert('Error deleting asset');
      }
    },
    
    copyAssetUrl(url) {
      navigator.clipboard.writeText(window.location.origin + url);
      alert('URL copied to clipboard!');
    },
    
    openAssetPicker(target) {
      this.assetPickerTarget = target;
      this.showAssetPicker = true;
    },
    
    selectAsset(url) {
      if (this.assetPickerTarget === 'featuredImage') {
        this.currentBlogPost.featuredImage = url;
      }
      this.showAssetPicker = false;
    },
    
    // Inquiries Methods
    async loadInquiries() {
      try {
        const response = await this.apiRequest('/api/inquiries');
        this.inquiries = await response.json();
      } catch (error) {
        console.error('Error loading inquiries:', error);
      }
    },
    
    async updateInquiryStatus(id, status) {
      try {
        const response = await this.apiRequest(`/api/inquiries/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status })
        });
        
        if (response.ok) {
          await this.loadInquiries();
        }
      } catch (error) {
        console.error('Error updating inquiry:', error);
      }
    },
    
    // Utility Methods
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    },
    
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },
    
    logout() {
      if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login.html';
      }
    }
  }
}).mount('#app');
