import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Users, 
  FileText, 
  Settings, 
  Play, 
  Edit, 
  Trash2,
  Copy,
  Download,
  Upload,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import useCrewStore from '../stores/crewStore';
import useUIStore from '../stores/uiStore';
import { formatDateTime, formatRelativeTime } from '../utils/helpers';

const CrewBuilder = () => {
  const { 
    crews, 
    isLoading, 
    createCrew, 
    updateCrew, 
    deleteCrew,
    addNotification 
  } = useCrewStore();
  
  const { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilter,
    openModal,
    closeModal,
    isModalOpen 
  } = useUIStore();

  const [selectedCrew, setSelectedCrew] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filter crews based on search and filters
  const filteredCrews = crews.filter(crew => {
    const matchesSearch = crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crew.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || crew.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const handleCreateCrew = async (crewData) => {
    try {
      await createCrew(crewData);
      setIsCreateModalOpen(false);
      addNotification({
        type: 'success',
        title: 'Crew Created',
        message: 'Crew created successfully',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to create crew',
        duration: 3000,
      });
    }
  };

  const handleEditCrew = async (crewId, updates) => {
    try {
      await updateCrew(crewId, updates);
      setIsEditModalOpen(false);
      setSelectedCrew(null);
      addNotification({
        type: 'success',
        title: 'Crew Updated',
        message: 'Crew updated successfully',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to update crew',
        duration: 3000,
      });
    }
  };

  const handleDeleteCrew = async (crewId) => {
    try {
      await deleteCrew(crewId);
      setIsDeleteModalOpen(false);
      setSelectedCrew(null);
      addNotification({
        type: 'success',
        title: 'Crew Deleted',
        message: 'Crew deleted successfully',
        duration: 3000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to delete crew',
        duration: 3000,
      });
    }
  };

  const handleExecuteCrew = (crew) => {
    addNotification({
      type: 'info',
      title: 'Execute Crew',
      message: `Executing crew: ${crew.name}`,
      duration: 3000,
    });
  };

  const handleDuplicateCrew = (crew) => {
    addNotification({
      type: 'info',
      title: 'Duplicate Crew',
      message: `Duplicating crew: ${crew.name}`,
      duration: 3000,
    });
  };

  const handleExportCrew = (crew) => {
    addNotification({
      type: 'info',
      title: 'Export Crew',
      message: `Exporting crew: ${crew.name}`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Crew Builder</h1>
          <p className="text-muted-foreground">
            Create, manage, and organize your AI agent crews
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          icon={<Plus className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          Create Crew
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={filters.status}
                onChange={(e) => setFilter('status', e.target.value)}
                className="px-3 py-2 border rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
              <Button variant="outline" size="sm" icon={<Filter className="h-4 w-4" />}>
                Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crews Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCrews.map((crew, index) => (
          <motion.div
            key={crew.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{crew.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {crew.description || 'No description'}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCrew(crew);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedCrew(crew);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Crew Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Agents</p>
                      <p className="font-medium">{crew.agents?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tasks</p>
                      <p className="font-medium">{crew.tasks?.length || 0}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      crew.status === 'active' ? 'bg-green-500' :
                      crew.status === 'inactive' ? 'bg-gray-500' :
                      'bg-yellow-500'
                    }`} />
                    <span className="text-sm capitalize">{crew.status || 'draft'}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleExecuteCrew(crew)}
                      icon={<Play className="h-3 w-3" />}
                      className="w-full sm:w-auto"
                    >
                      Execute
                    </Button>
                    <div className="flex justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDuplicateCrew(crew)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleExportCrew(crew)}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Last Modified */}
                  <div className="text-xs text-muted-foreground">
                    Modified {formatRelativeTime(crew.updated_at)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCrews.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No crews found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || filters.status !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Create your first crew to get started'
            }
          </p>
          {!searchQuery && filters.status === 'all' && (
            <Button onClick={() => setIsCreateModalOpen(true)}>
              Create Your First Crew
            </Button>
          )}
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading crews...</p>
        </div>
      )}

      {/* Create Crew Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Crew"
        description="Create a new AI agent crew"
        size="lg"
      >
        <CreateCrewForm onSubmit={handleCreateCrew} />
      </Modal>

      {/* Create Crew Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Crew"
        description="Create a new AI agent crew"
        size="lg"
      >
        <CreateCrewForm onSubmit={handleCreateCrew} />
      </Modal>

      {/* Edit Crew Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCrew(null);
        }}
        title="Edit Crew"
        description="Modify crew settings and configuration"
        size="lg"
      >
        {selectedCrew && (
          <EditCrewForm 
            crew={selectedCrew} 
            onSubmit={(updates) => handleEditCrew(selectedCrew.id, updates)} 
          />
        )}
      </Modal>

      {/* Delete Crew Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCrew(null);
        }}
        title="Delete Crew"
        description="Are you sure you want to delete this crew? This action cannot be undone."
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This will permanently delete the crew "{selectedCrew?.name}" and all associated data.
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedCrew(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedCrew && handleDeleteCrew(selectedCrew.id)}
            >
              Delete Crew
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Create Crew Form Component
const CreateCrewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    agents: [],
    tasks: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Crew Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter crew name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter crew description"
          className="w-full px-3 py-2 border rounded-md text-sm"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit">Create Crew</Button>
      </div>
    </form>
  );
};

// Edit Crew Form Component
const EditCrewForm = ({ crew, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: crew.name,
    description: crew.description || '',
    agents: crew.agents || [],
    tasks: crew.tasks || [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Crew Name</label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter crew name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter crew description"
          className="w-full px-3 py-2 border rounded-md text-sm"
          rows={3}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit">Update Crew</Button>
      </div>
    </form>
  );
};

export default CrewBuilder; 