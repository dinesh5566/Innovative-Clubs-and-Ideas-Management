import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    
    // Add notification to the array
    setNotifications(prev => [...prev, { id, message, type, duration }]);
    
    // Remove notification after specified duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, duration);
    
    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Shorthand methods for different notification types
  const success = useCallback((message, duration) => {
    return showNotification(message, 'success', duration);
  }, [showNotification]);

  const error = useCallback((message, duration) => {
    return showNotification(message, 'danger', duration);
  }, [showNotification]);

  const info = useCallback((message, duration) => {
    return showNotification(message, 'info', duration);
  }, [showNotification]);

  const warning = useCallback((message, duration) => {
    return showNotification(message, 'warning', duration);
  }, [showNotification]);

  // Provide the context value
  const value = {
    notifications,
    showNotification,
    removeNotification,
    success,
    error,
    info,
    warning
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Notification display container */}
      {notifications.length > 0 && (
        <div className="notification-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          {notifications.map(({ id, message, type }) => (
            <div 
              key={id} 
              className={`alert alert-${type} alert-dismissible fade show`}
              role="alert"
            >
              {message}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => removeNotification(id)}
                aria-label="Close"
              ></button>
            </div>
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;