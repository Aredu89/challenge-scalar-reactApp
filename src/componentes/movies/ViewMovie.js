import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputForm from '../forms/InputForm';
import SelectForm from '../forms/SelectForm';
import axios from 'axios';
import { APP_API } from '../../config';
import Swal from 'sweetalert2';
import Spinner from '../common/Spinner'
import { dateFormatter } from '../common/functions'
import './ViewMovie.css';

const ViewMovie = props => {
	const { id } = useParams()
  const [ movieLoading, setMovieLoading ] = useState(false)
	const [ movieError, setMovieError ] = useState(false)
	const [ movie, setMovie ] = useState({})
	const [ reloadMovie, setReloadMovie ] = useState(true)
	const [ name, setName ] = useState()
	const [ nameError, setNameError ] = useState(false)
	const [ rate, setRate ] = useState()
	const [ rateError, setRateError ] = useState(false)
	const [ comment, setComment ] = useState()
	const [ commentError, setCommentError ] = useState(false)
	const [ loadingAdd, setLoadingAdd ] = useState(false)
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
						//Set the data
						setMovie(response.data)
          }
        } catch {
          setMovieError(true)
        }
        setMovieLoading(false)
      }
      fetchData()
    } else {
			setMovieError(true)
		}
	},[
		reloadMovie
	])

	const handleClickCancel = () => {
    history.push('/movies')
	}
	
	const handleClickAdd = () => {
		if(!name) setNameError(true)
		if(!rate) setRateError(true)
		if(!comment) setCommentError(true)
		if(
			name && rate && comment
		){
			const bodyAux = movie
			bodyAux.rates = [
				{
					user: name,
					rate: rate,
					comment: comment
				}
			]
			//Seteo el header
      const header = {
        headers: {
          'Content-Type': 'application/json'
        }
			}
			setLoadingAdd(true)
			axios.put(`${APP_API}/movies/${id}`, bodyAux, header)
				.then(res=>{
					setLoadingAdd(false)
					//Success!
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: 'Comment added!',
						showConfirmButton: false,
						timer: 1500
					})
					//Reloading the movie
					setReloadMovie(!reloadMovie)
					setName('')
					setRate('')
					setComment('')
				})
				.catch(err=>{
					setLoadingAdd(false)
					Swal.fire({
						position: 'top-end',
						icon: 'error',
						title: 'Error adding the comment',
						text: err.response.data.message,
						showConfirmButton: true
					})
				})
		}
	}
	
	return(
    <div data-testid="crear-registro" className="crear-registro">
      <div className="titulo">
        Details and comments
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
            Go Back
          </Button>
        </div>
      </div>
      <Divider />
      <div className="row mt-3 mb-3 pr-2">
        <div className="col-6">
					<div className="title">Title</div>
					<div className="content">{movie.title ? movie.title : 'n/a'}</div>
        </div>
        <div className="col-6">
					<div className="title">Year</div>
					<div className="content">{movie.year ? movie.year : 'n/a'}</div>
        </div>
      </div>
      <div className="row mt-3 mb-3 pr-2">
        <div className="col-6">
					<div className="title">Rated</div>
					<div className="content">{movie.rated ? movie.rated : 0}</div>
        </div>
        <div className="col-6">
					<div className="title">Released on</div>
					<div className="content">{movie.release_on ? dateFormatter(movie.release_on) : 'n/a'}</div>
        </div>
      </div>
			<div className="row mt-3 mb-3 pr-2">
        <div className="col-6">
					<div className="title">Genre</div>
					<div className="content">{movie.genre ? movie.genre : 'n/a'}</div>
        </div>
        <div className="col-6">
					<div className="title">Director</div>
					<div className="content">{movie.director ? movie.director : 'n/a'}</div>
        </div>
      </div>
			<div className="row mt-3 mb-3 pr-2">
				<div className="col-12">
					<div className="title">Details</div>
					<div className="content">{movie.details ? movie.details : 'n/a'}</div>
				</div>
			</div>
			<div className="row mt-3 mb-3 pr-2">
				<div className="col-12">
					<div className="title">Plot</div>
					<div className="content">{movie.plot ? movie.plot : 'n/a'}</div>
				</div>
			</div>
			<Divider />
			<div className="row mt-3 mb-3 pr-2">
				<div className="col-12">
					<div className="title">Comments</div>
					{
						movie.rates ?
							movie.rates.length > 0 ?
								movie.rates.map(rt=>{
									return(
										<div className="mb-3">
											<div>{rt.user}</div>
											<div>{`Rate: ${rt.rate}`}</div>
											<div>{`Comment: ${rt.comment}`}</div>
										</div>
									)
								})
							: <div>No comments - Add the first comment</div>
						: <div>No comments - Add the first comment</div>
					}
					<div className="title">Add a comment</div>
					<div className="row mt-3 mb-3 pr-2">
						<div className="col-6 pt-2">
							<InputForm
								label="Your Name"
								onChange={event => {
									setName(event.target.value)
									setNameError(false)
								}}
								value={name}
								error={nameError}
								errorText="The name is required"
								/>
						</div>
						<div className="col-6">
							<SelectForm
								label="Rate"
								options={[
									{
										value: 1, label: "1"
									},
									{
										value: 2, label: "2"
									},
									{
										value: 3, label: "3"
									},
									{
										value: 4, label: "4"
									},
									{
										value: 5, label: "5"
									},
								]}
								onChange={event => {
									setRate(event.target.value)
									setRateError(false)
								}}
								value={rate}
								error={rateError}
								errorText="The rate is required"
								/>
						</div>
					</div>
					<div className="row mt-3 mb-3">
						<div className="col-12">
							<InputForm
								label="Comment"
								onChange={event => {
									setComment(event.target.value)
									setCommentError(false)
								}}
								value={comment}
								multiline={true}
								error={commentError}
								errorText="The comment is required"
								/>
						</div>
					</div>
					<div className="row mt-3 mb-3">
						<div className="col-3">
							{
								loadingAdd ?
								<Spinner />
								:
								<Button 
									variant="contained"
									color="primary"
									onClick={handleClickAdd}
									>
									Add
								</Button>
							}
						</div>
					</div>
				</div>
			</div>
    </div>
  )
}

export default ViewMovie