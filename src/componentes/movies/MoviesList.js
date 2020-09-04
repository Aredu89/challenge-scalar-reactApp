import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import List from '../common/List';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import ForumIcon from '@material-ui/icons/Forum';
import { dateFormatter } from '../common/functions'
import axios from 'axios';
import { APP_API } from '../../config'
import Swal from 'sweetalert2';
import './MoviesList.css';

//Hooks para obtener listado desde la api
const useMovies = () => {
  const [movies, setMovies] = useState([])
  const [moviesLoading, setMoviesLoading] = useState(false)
  const [moviesError, setMoviesError] = useState(false)
  const [reloadMovies, setReloadMovies] = useState(false)

  useEffect(() =>{
    const fetchData = async () => {
      setMoviesError(false)
      setMoviesLoading(true)
      const header = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try{
        const response = await axios(`${APP_API}/movies`, header)
        //We handle error response
        if(response.error){
          setMoviesError(true)
        } else {
          setMovies(response.data)
        }
      } catch {
        setMoviesError(true)
      }
        
      setMoviesLoading(false)
    }
    fetchData()
  },[
    reloadMovies
  ])

  return [{ movies, moviesLoading, moviesError, reloadMovies }, setReloadMovies]
}

const MoviesList = props => {
  const [{ movies, moviesLoading, moviesError, reloadMovies }, setReloadMovies] = useMovies()
  const history = useHistory()

  const onEliminar = id => {
    const header = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.delete(`${APP_API}/movies/${id}`)
      .then(res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Movies deleted',
          showConfirmButton: false,
          timer: 1500
        })
        setReloadMovies(!reloadMovies)
      })
      .catch(err=>{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error deleting movie',
          text: err.response.data.message,
          showConfirmButton: true
        })
      })
  }

  const onEdit = id => {
    history.push(`/movies/edit/${id}`)
  }

  const onComments = id => {
    history.push(`/movies/view/${id}`)
  }

  const options = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="boton-acciones-container d-flex justify-content-between">
        <Tooltip title="Comments">
          <IconButton
            size="small"
            className="boton-accion"
            onClick={()=>formatExtraData.onComments(row._id)}
          >
            <ForumIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            className="boton-accion"
            onClick={()=>formatExtraData.onEdit(row._id)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            className="boton-accion"
            onClick={()=>formatExtraData.onDelete(row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        
      </div>
    )
  }

  const dateCell = (cell, row) => {
    return dateFormatter(cell)
  }

  //Columns
  const columns = [
    {
      dataField: 'title',
      text: 'Title'
    },
    {
      dataField: 'year',
      text: 'Year'
    },
    {
      dataField: 'rated',
      text: 'Rated'
    },
    {
      dataField: 'genre',
      text: 'Genre'
    },
    // {
    //   dataField: 'release_on',
    //   text: 'Release on',
    //   formatter: dateCell
    // },
    {
      dataField: '_id',
      text: 'Options',
      headerClasses: 'columna-eliminar',
      formatter: options,
      formatExtraData: { 
        onDelete: onEliminar,
        onEdit: onEdit,
        onComments: onComments
      }
    }
  ]

  const defaultSorted = [
    {
      dataField: 'year',
      order: 'desc'
    },
    {
      dataField: 'rated',
      order: 'desc'
    },
  ]

  const handleClickCreate = () => {
    history.push('/movies/create')
  }

  return(
    <div className="monedas-lista">
      <div className="titulo">List of Movies</div>
      {/* Button to create a movie */}
      <div className="row mt-2 mb-2">
        <div className="col-4">
          <Button 
            variant="contained"
            color="primary"
            onClick={handleClickCreate}
            >
            Add Movie
          </Button>
        </div>
      </div>
      <List
        data={movies ? movies.length > 0 ? movies : "" : ""}
        columns={columns}
        loading={moviesLoading}
        error={moviesError}
        defaultSorted={defaultSorted}
        />
    </div>
  )
}

export default MoviesList