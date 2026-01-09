import React, { useState, useEffect, useMemo } from 'react';
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
import { useAdminSearch } from '../../context/AdminSearchContext.jsx';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: '#0d1a0d',
  border: '1px solid #00ff00',
  boxShadow: '0 0 40px rgba(0, 255, 0, 0.3)',
  p: 4,
  color: '#00ff00',
  fontFamily: '"Space Mono", monospace',
};

// DataGrid custom styling
const dataGridSx = {
  border: '1px solid #00ff00',
  backgroundColor: '#0d1a0d',
  color: '#00cc00',
  fontFamily: '"Space Mono", monospace',
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#0a1a0a',
    borderBottom: '2px solid #00ff00',
    color: '#00ff00',
    fontFamily: '"Share Tech Mono", monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    color: '#00ff00',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: '1px solid rgba(0, 255, 0, 0.2)',
    color: '#00cc00',
    fontFamily: '"Space Mono", monospace',
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: 'rgba(0, 255, 0, 0.08)',
  },
  '& .MuiDataGrid-row.Mui-selected': {
    backgroundColor: 'rgba(0, 255, 0, 0.12)',
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid #008800',
    backgroundColor: '#0a1a0a',
    color: '#00cc00',
  },
  '& .MuiTablePagination-root': {
    color: '#00cc00',
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    color: '#00cc00',
    fontFamily: '"Space Mono", monospace',
  },
  '& .MuiTablePagination-actions button': {
    color: '#00ff00',
  },
  '& .MuiTablePagination-actions button:hover': {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  '& .MuiTablePagination-selectIcon': {
    color: '#00ff00',
  },
  '& .MuiDataGrid-sortIcon': {
    color: '#00ff00',
  },
  '& .MuiDataGrid-menuIcon': {
    color: '#00ff00',
  },
  '& .MuiCheckbox-root': {
    color: '#00cc00',
  },
  '& .MuiCheckbox-root.Mui-checked': {
    color: '#00ff00',
  },
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

  // Get search query from context
  const { searchQuery } = useAdminSearch();

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(article =>
      article.name?.toLowerCase().includes(query) ||
      article.title?.toLowerCase().includes(query) ||
      article.severity?.toLowerCase().includes(query) ||
      article.content?.some(c => c.toLowerCase().includes(query))
    );
  }, [articles, searchQuery]);

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
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'rgba(0, 255, 0, 0.3)',
                borderColor: '#00ff00',
              },
              '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
                backgroundColor: '#00ff00',
                boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
              },
              '& .MuiSwitch-track': {
                backgroundColor: 'rgba(0, 136, 0, 0.3)',
                border: '1px solid #008800',
              },
              '& .MuiSwitch-thumb': {
                backgroundColor: '#00cc00',
              },
            }}
          />
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => (
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleEdit(params.row._id)}
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                fontSize: '0.75rem',
                border: '1px solid #00ff00',
                color: '#00ff00',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 255, 0, 0.1)',
                  borderColor: '#00ff00',
                  color: '#00ff88',
                  boxShadow: '0 0 15px rgba(0, 255, 0, 0.4)',
                },
              }}
            >
              Edit
            </Button>
          </Stack>
        ),
      },
    ] : []),
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          mb: 3,
          pb: 2,
          borderBottom: '1px solid #00ff00',
          position: 'relative',
        }}
      >
        <Stack>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontFamily: '"Share Tech Mono", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#00ff00',
              textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
            }}
          >
            Intel
          </Typography>
          {!canEdit && (
            <Typography
              variant="caption"
              sx={{
                color: '#008800',
                fontFamily: '"Space Mono", monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              View-only mode
            </Typography>
          )}
        </Stack>
        {canEdit && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleOpen}
            sx={{
              fontFamily: '"Share Tech Mono", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 600,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderRadius: '2px',
              transition: 'all 0.18s ease',
              position: 'relative',
              overflow: 'hidden',
              borderColor: '#00ff00',
              color: '#00ff00',
              backgroundColor: 'transparent',
              boxShadow: '0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 30px rgba(0, 255, 0, 0.1)',
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                color: '#00ff88',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
            }}
          >
            Add Intel
          </Button>
        )}
      </Stack>

      <DataGrid
        rows={filteredArticles}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
        sx={dataGridSx}
      />

      {canEdit && (
        <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Share Tech Mono", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
              color: '#00ff00',
              textShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
              mb: 2,
            }}
          >
            {isEditing ? 'Edit Intel' : 'Add Intel'}
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              value={newArticle.name}
              onChange={(e) => setNewArticle({ ...newArticle, name: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#00ff00',
                  '& fieldset': {
                    borderColor: '#008800',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00ff00',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ff00',
                    boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: '"Space Mono", monospace',
                  color: '#00cc00',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#00ff00',
                },
                '& .MuiInputBase-input': {
                  fontFamily: '"Space Mono", monospace',
                  color: '#00ff00',
                },
              }}
            />
            <TextField
              label="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#00ff00',
                  '& fieldset': {
                    borderColor: '#008800',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00ff00',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ff00',
                    boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: '"Space Mono", monospace',
                  color: '#00cc00',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#00ff00',
                },
                '& .MuiInputBase-input': {
                  fontFamily: '"Space Mono", monospace',
                  color: '#00ff00',
                },
              }}
            />
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontFamily: '"Space Mono", monospace',
                  color: '#00cc00',
                  '&.Mui-focused': {
                    color: '#00ff00',
                  },
                }}
              >
                Severity
              </InputLabel>
              <Select
                label="Severity"
                value={newArticle.severity || 'Info'}
                onChange={(e) => setNewArticle({ ...newArticle, severity: e.target.value })}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#008800',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00ff00',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#00ff00',
                    boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
                  },
                  color: '#00ff00',
                  fontFamily: '"Space Mono", monospace',
                }}
              >
                <MenuItem value="Critical" sx={{ fontFamily: '"Space Mono", monospace', color: '#00cc00' }}>Critical</MenuItem>
                <MenuItem value="High" sx={{ fontFamily: '"Space Mono", monospace', color: '#00cc00' }}>High</MenuItem>
                <MenuItem value="Info" sx={{ fontFamily: '"Space Mono", monospace', color: '#00cc00' }}>Info</MenuItem>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#00ff00',
                  '& fieldset': {
                    borderColor: '#008800',
                  },
                  '&:hover fieldset': {
                    borderColor: '#00ff00',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ff00',
                    boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontFamily: '"Space Mono", monospace',
                  color: '#00cc00',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#00ff00',
                },
                '& .MuiInputBase-input': {
                  fontFamily: '"Space Mono", monospace',
                  color: '#00ff00',
                },
              }}
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '2px',
                transition: 'all 0.18s ease',
                borderColor: '#00cc00',
                color: '#00cc00',
                '&:hover': {
                  backgroundColor: 'rgba(0, 255, 0, 0.1)',
                  borderColor: '#00ff00',
                  color: '#00ff88',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              onClick={handleSaveArticle}
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '2px',
                transition: 'all 0.18s ease',
                borderColor: '#00ff00',
                color: '#00ff00',
                backgroundColor: 'transparent',
                boxShadow: '0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 30px rgba(0, 255, 0, 0.1)',
                  backgroundColor: 'rgba(0, 255, 0, 0.1)',
                  color: '#00ff88',
                },
              }}
            >
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
