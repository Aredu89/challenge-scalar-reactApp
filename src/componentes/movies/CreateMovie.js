import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DatePickerForm from '../forms/DatePickerForm';
import InputForm from '../forms/InputForm';
import axios from 'axios';
import { APP_API } from '../../config';
import Swal from 'sweetalert2';
import Spinner from '../common/Spinner'
import './CreateMovie.css';

const CreateMovie = props => {
  const { id } = useParams()
  const [ movieLoading, setMovieLoading ] = useState(false)
  const [ movieError, setMovieError ] = useState(false)

  const [ title, setTitle ] = useState('')
  const [ errorTitle, setErrorTitle ] = useState(false)
  const [ year, setYear ] = useState()
  const [ details, setDetails ] = useState()
  const [ releaseOn, setReleaseOn ] = useState(new Date())
  const [ genre, setGenre ] = useState()
  const [ director, setDirector ] = useState()
  const [ plot, setPlot ] = useState()
  const [ loadingSave, setLoadingSave ] = useState(false)

  const history = useHistory()

  useEffect(()=>{
    if(id){
      const fetchData = async () => {
        setMovieLoading(true)
        setMovieError(false)
        const header = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        try{
          const response = await axios(`${APP_API}/movies/${id}`, header)
          if(response.error){
            setMovieError(true)
          } else {
            //Set the data in the form
            setTitle(response.data.title)
            if(response.data.year){
              setYear(response.data.year)
            }
            if(response.data.details){
              setDetails(response.data.details)
            }
            if(response.data.release_on){
              setReleaseOn(response.data.release_on)
            }
            if(response.data.genre){
              setGenre(response.data.genre)
            }
            if(response.data.director){
              setDirector(response.data.director)
            }
            if(response.data.plot){
              setPlot(response.data.plot)
            }
          }
        } catch {
          setMovieError(true)
        }
        setMovieLoading(false)
      }
      fetchData()
    }
  },[])

  const handleClickSave = () => {
    if(!title) setErrorTitle(true)
    if(
      title
    ){
      //Preparing the body
      const body = {
        title: title,
        year: year,
        details: details,
        release_on: releaseOn,
        genre: genre,
        director: director,
        plot: plot
      }
      //Seteo el header
      const header = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      setLoadingSave(true)
      //Cheking if I am updating or creating
      if(id){
        //Update
        axios.put(`${APP_API}/movies/${id}`, body, header)
          .then(res=>{
            setLoadingSave(false)
            //Success!
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Movie updated!',
              showConfirmButton: false,
              timer: 1500
            })
            //Going back to the list
            history.push('/movies')
          })
          .catch(err=>{
            setLoadingSave(false)
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error updating',
              text: err.response.data.message,
              showConfirmButton: true
            })
          })
      } else {
        //Create
        axios.post(`${APP_API}/movies`, body, header)
          .then(res=>{
            setLoadingSave(false)
            //Success!
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Movies created!',
              showConfirmButton: false,
              timer: 1500
            })
            //Going back to the list
            history.push('/movies')
          })
          .catch(err=>{
            setLoadingSave(false)
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error creating',
              text: err.response.data.message,
              showConfirmButton: true
            })
          })
      }
    }
  }

  const handleClickCancel = () => {
    history.push('/movies')
  }

  return(
    <div data-testid="crear-registro" className="crear-registro">
      <div className="titulo">
        { id ? 'Updating movie' : 'Creating movie'}
      </div>
      {
        movieLoading &&
        <Spinner />
      }
      {
        movieError &&
        <div className="error">Error loading the movie</div>
      }
      <Divider />
      <div className="row mt-3 mb-3">
        <div className="col-3 mt-2">
          <Button 
            variant="contained"
            color="secondary"
            onClick={handleClickCancel}
            >
            Cancel
          </Button>
        </div>
        {/* Button to save */}
        <div className="col-3 mt-2">
          {
            loadingSave ? 
            <Spinner />
            :
            <Button 
              variant="contained"
              color="primary"
              onClick={handleClickSave}
              >
              Save
            </Button>
          }
        </div>
      </div>
      <Divider />
      <div className="row mt-3 mb-3 pr-2">
        <div className="col-6">
          <InputForm
            label="Title"
            onChange={event => {
              setTitle(event.target.value)
              setErrorTitle(false)
            }}
            value={title}
            error={errorTitle}
            errorText="The title is required"
            inputProps={{
              maxLength: 255
            }}
            />
        </div>
        <div className="col-6">
          <InputForm
            label="Year"
            type="number"
            onChange={event => {
              setYear(event.target.value)
            }}
            value={year}
            />
        </div>
      </div>
      <div className="row mt-3 mb-3 pr-2">
        <DatePickerForm
          label="Release on"
          value={releaseOn}
          onChange={date=>setReleaseOn(date)}
          />
        <div className="col-6 mt-2">
          <InputForm
            label="Genre"
            onChange={event => {
              setGenre(event.target.value)
            }}
            value={genre}
            />
        </div>
      </div>
      <div className="mt-3 mb-3 pr-2">
        <InputForm
          label="Details"
          onChange={event => {
            setDetails(event.target.value)
          }}
          value={details}
          multiline={true}
          />
      </div>
      <div className="row mt-3 mb-3 pr-2">
        <div className="col-6">
          <InputForm
            label="Director"
            onChange={event => {
              setDirector(event.target.value)
            }}
            value={director}
            />
        </div>
      </div>
      <div className="mt-3 mb-3 pr-2">
        <InputForm
          label="Plot"
          onChange={event => {
            setPlot(event.target.value)
          }}
          value={plot}
          multiline={true}
          />
      </div>
    </div>
  )
}

export default CreateMovie