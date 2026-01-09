import React, { useState, useEffect } from 'react';
import { fetchArticles, createArticle, updateArticle, toggleArticleStatus } from '../../services/ArticleService';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Stack,
  Typography,
  Modal,
  Box,
  TextField,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    name: '',
    title: '',
    content: [],
    severity: 'Info',
    isActive: true,
  });

  // Get user type from localStorage
  const userType = localStorage.getItem('type');
  const canEdit = userType === 'admin' || userType === 'editor';

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({
      name: '',
      title: '',
      content: [],
      severity: 'Info',
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((article) => article._id === id);
    if (articleToEdit) {
      setNewArticle(articleToEdit);
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await toggleArticleStatus(id);
      loadArticles();
    } catch (error) {
      console.error('Error toggling article status:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'title', headerName: 'Title', flex: 1 },
    {
      field: 'severity',
      headerName: 'Severity',
      flex: 0.75,
      renderCell: (params) => {
        const severityColors = {
          Critical: '#ef4444',
          High: '#f59e0b',
          Info: '#22d3ee',
        };
        return (
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '12px',
              backgroundColor: `${severityColors[params.row.severity]}20`,
              color: severityColors[params.row.severity],
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            {params.row.severity}
          </span>
        );
      },
    },
    ...(canEdit ? [
      {
        field: 'isActive',
        headerName: 'Active',
        flex: 0.75,
        renderCell: (params) => (
          <Switch
            checked={params.row.isActive}
            onChange={() => handleToggleActive(params.row._id)}
          />
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <Button variant="contained" size="small" onClick={() => handleEdit(params.row._id)}>
              Edit
            </Button>
          </Stack>
        ),
      },
    ] : []),
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Stack>
          <Typography variant="h2" fontWeight='bold'>Intel</Typography>
          {!canEdit && (
            <Typography variant="caption" color="text.secondary">
              View-only mode
            </Typography>
          )}
        </Stack>
        {canEdit && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleOpen}
          >
            Add Intel
          </Button>
        )}
      </Stack>

      <DataGrid
        rows={articles}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
      />

      {canEdit && (
        <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6">{isEditing ? 'Edit Intel' : 'Add Intel'}</Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              value={newArticle.name}
              onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
            />
            <TextField
              label="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Severity</InputLabel>
              <Select
                label="Severity"
                value={newArticle.severity || 'Info'}
                onChange={(e) => setNewArticle({ ...newArticle, severity: e.target.value })}
              >
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Info">Info</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Content"
              multiline
              rows={4}
              value={newArticle.content.join('\n')}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value.split('\n') })
              }
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveArticle}>
              {isEditing ? 'Save Changes' : 'Add'}
            </Button>
          </Stack>
        </Box>
      </Modal>
      )}
    </>
  );
}

export default DashArticleListPage;
