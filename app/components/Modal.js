'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  AlertCircle,
  HelpCircle,
  Trash2,
  Save,
  Plus,
  Edit,
  Eye,
  Download,
  Share2,
  Settings
} from 'lucide-react';

// Hook pour désactiver le scroll du body
const useBodyScrollLock = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
};

// Composant Modal de base
export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = ''
}) {
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl'
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0"
        onClick={handleOverlayClick}
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        
        {/* Modal */}
        <div className={`
          relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 
          shadow-xl transition-all w-full ${sizeClasses[size]} ${className}
        `}>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

// Modal de confirmation
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'default',
  loading = false
}) {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'info':
        return <Info className="h-6 w-6 text-blue-500" />;
      default:
        return <HelpCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getButtonColor = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
      default:
        return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>
        
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-secondary disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${getButtonColor()}`}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>En cours...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Modal de formulaire
export function FormModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = 'Sauvegarder',
  cancelText = 'Annuler',
  loading = false,
  size = 'md'
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        
        <div className="p-6">
          {children}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="btn-secondary disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>En cours...</span>
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {submitText}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Modal d'alerte
export function AlertModal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  buttonText = 'OK'
}) {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-8 w-8 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      default:
        return <Info className="h-8 w-8 text-blue-500" />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}
        </p>
        
        <button
          onClick={onClose}
          className="btn-primary"
        >
          {buttonText}
        </button>
      </div>
    </Modal>
  );
}

// Modal de contenu riche
export function ContentModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'lg'
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <div className="flex flex-col max-h-screen">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
        
        {footer && (
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex-shrink-0">
            {footer}
          </div>
        )}
      </div>
    </Modal>
  );
}

// Modal de sélection d'actions
export function ActionModal({
  isOpen,
  onClose,
  title,
  actions = []
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        
        <div className="space-y-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                action.danger 
                  ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {action.icon && <action.icon className="h-5 w-5" />}
              <div>
                <p className="font-medium">{action.label}</p>
                {action.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {action.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full btn-secondary"
          >
            Annuler
          </button>
        </div>
      </div>
    </Modal>
  );
}

// Hook pour utiliser les modales facilement
export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  return { isOpen, openModal, closeModal };
}

// Exemples d'utilisation des modales
export function ModalExamples() {
  const confirmModal = useModal();
  const formModal = useModal();
  const alertModal = useModal();
  const actionModal = useModal();

  const handleDelete = () => {
    console.log('Élément supprimé');
  };

  const handleFormSubmit = (e) => {
    console.log('Formulaire soumis');
    formModal.closeModal();
  };

  const actionItems = [
    {
      icon: Edit,
      label: 'Modifier',
      description: 'Modifier cet élément',
      onClick: () => console.log('Modifier')
    },
    {
      icon: Download,
      label: 'Télécharger',
      description: 'Télécharger le fichier',
      onClick: () => console.log('Télécharger')
    },
    {
      icon: Share2,
      label: 'Partager',
      description: 'Partager avec d\'autres utilisateurs',
      onClick: () => console.log('Partager')
    },
    {
      icon: Trash2,
      label: 'Supprimer',
      description: 'Supprimer définitivement',
      onClick: () => console.log('Supprimer'),
      danger: true
    }
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Exemples de Modales</h2>
      
      <div className="flex flex-wrap gap-4">
        <button onClick={confirmModal.openModal} className="btn-primary">
          Modal de confirmation
        </button>
        <button onClick={formModal.openModal} className="btn-primary">
          Modal de formulaire
        </button>
        <button onClick={alertModal.openModal} className="btn-primary">
          Modal d'alerte
        </button>
        <button onClick={actionModal.openModal} className="btn-primary">
          Modal d'actions
        </button>
      </div>

      {/* Modales */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={confirmModal.closeModal}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
        type="danger"
        confirmText="Supprimer"
        cancelText="Annuler"
      />

      <FormModal
        isOpen={formModal.isOpen}
        onClose={formModal.closeModal}
        onSubmit={handleFormSubmit}
        title="Nouveau formulaire"
        submitText="Créer"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Entrez le nom"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Entrez une description"
            />
          </div>
        </div>
      </FormModal>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={alertModal.closeModal}
        title="Opération réussie"
        message="Votre demande a été traitée avec succès."
        type="success"
      />

      <ActionModal
        isOpen={actionModal.isOpen}
        onClose={actionModal.closeModal}
        title="Que souhaitez-vous faire ?"
        actions={actionItems}
      />
    </div>
  );
}