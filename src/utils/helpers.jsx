// Helper functions for the application

/**
 * Format a date string to a more readable format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    
    return date.toLocaleDateString('en-US', options);
  };
  
  /**
   * Format a time string to 12-hour format
   * @param {string} timeString - Time string in HH:MM format
   * @returns {string} - Formatted time
   */
  export const formatTime = (timeString) => {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    
    return `${formattedHour}:${minutes} ${period}`;
  };
  
  /**
   * Truncate a string to a specific length and add ellipsis
   * @param {string} str - String to truncate
   * @param {number} length - Maximum length
   * @returns {string} - Truncated string
   */
  export const truncateString = (str, length = 50) => {
    if (!str) return '';
    
    if (str.length <= length) return str;
    
    return str.slice(0, length) + '...';
  };
  
  /**
   * Generate a random ID
   * @returns {string} - Random ID
   */
  export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  
  /**
   * Capitalize the first letter of each word in a string
   * @param {string} str - String to capitalize
   * @returns {string} - Capitalized string
   */
  export const capitalizeWords = (str) => {
    if (!str) return '';
    
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  
  /**
   * Format a number with commas
   * @param {number} number - Number to format
   * @returns {string} - Formatted number
   */
  export const formatNumber = (number) => {
    if (number === undefined || number === null) return '';
    
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  /**
   * Check if an object is empty
   * @param {object} obj - Object to check
   * @returns {boolean} - True if empty, false otherwise
   */
  export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };
  
  /**
   * Flatten an array of arrays
   * @param {Array} arr - Array to flatten
   * @returns {Array} - Flattened array
   */
  export const flattenArray = (arr) => {
    return [].concat(...arr);
  };
  
  /**
   * Group an array of objects by a specific key
   * @param {Array} arr - Array to group
   * @param {string} key - Key to group by
   * @returns {Object} - Grouped object
   */
  export const groupBy = (arr, key) => {
    return arr.reduce((result, item) => {
      const groupKey = item[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {});
  };
  
  /**
   * Sort an array of objects by a specific key
   * @param {Array} arr - Array to sort
   * @param {string} key - Key to sort by
   * @param {boolean} ascending - Sort direction
   * @returns {Array} - Sorted array
   */
  export const sortByKey = (arr, key, ascending = true) => {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return ascending ? -1 : 1;
      if (a[key] > b[key]) return ascending ? 1 : -1;
      return 0;
    });
  };
  
  /**
   * Filter an array of objects by a search term
   * @param {Array} arr - Array to filter
   * @param {string} searchTerm - Search term
   * @param {Array} searchKeys - Keys to search in
   * @returns {Array} - Filtered array
   */
  export const filterBySearchTerm = (arr, searchTerm, searchKeys) => {
    if (!searchTerm) return arr;
    
    const term = searchTerm.toLowerCase();
    
    return arr.filter(item => {
      return searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(term);
        }
        return false;
      });
    });
  };
  
  /**
   * Debounce a function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  export const debounce = (func, wait = 300) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Get status color based on status value
   * @param {string} status - Status value
   * @returns {string} - Bootstrap color class
   */
  export const getStatusColor = (status) => {
    const statusMap = {
      'proposed': 'warning',
      'in-progress': 'info',
      'approved': 'success',
      'rejected': 'danger',
      'upcoming': 'success',
      'completed': 'secondary',
      'cancelled': 'danger'
    };
    
    return statusMap[status] || 'secondary';
  };
  
  /**
   * Format a date-time string
   * @param {string} dateString - Date string
   * @param {string} timeString - Time string
   * @returns {Date} - JavaScript Date object
   */
  export const formatDateTime = (dateString, timeString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    
    if (timeString) {
      const [hours, minutes] = timeString.split(':');
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
    }
    
    return date;
  };
  
  /**
   * Check if a date is in the past
   * @param {string} dateString - Date string
   * @returns {boolean} - True if in the past, false otherwise
   */
  export const isDateInPast = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);
    
    return date < today;
  };
  
  /**
   * Get URL query parameters as an object
   * @param {string} queryString - Query string
   * @returns {Object} - Query parameters object
   */
  export const getQueryParams = (queryString = window.location.search) => {
    const params = new URLSearchParams(queryString);
    const result = {};
    
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    
    return result;
  };
  
  /**
   * Remove HTML tags from a string
   * @param {string} html - HTML string
   * @returns {string} - Plain text
   */
  export const stripHtml = (html) => {
    if (!html) return '';
    
    return html.replace(/<[^>]*>/g, '');
  };
  
  export default {
    formatDate,
    formatTime,
    truncateString,
    generateId,
    capitalizeWords,
    formatNumber,
    isEmptyObject,
    flattenArray,
    groupBy,
    sortByKey,
    filterBySearchTerm,
    debounce,
    getStatusColor,
    formatDateTime,
    isDateInPast,
    getQueryParams,
    stripHtml
  };