import React from 'react';
import ReactBootstrapTable from 'react-bootstrap-table-next';
import Spinner from './Spinner'

const ErrorMessage = props => {
  if(props.error) {
    return <div className="alert alert-danger" role="alert">
      Error loading the list
    </div>
  } else {
    return null
  }
}

const List = props => {
  const {
    columns,
    data,
    loading,
    error,
    defaultSorted
  } = props

  const getComponent = () => {
    if(loading){
      return(
        <Spinner />
      )
    } else if (error) {
      return(
        <ErrorMessage error={true} />
      )
    } else if(!data){
      return(
        <div>No data to show</div>
      )
    } else {
      return(
        <ReactBootstrapTable
          bootstrap4
          keyField="_id"
          data={ data }
          columns={ columns }
          defaultSorted= { defaultSorted ? defaultSorted : {}}
        />
      )
    }
  }

  return(
    <div className="pt-2 pb-2">
      {getComponent()}
    </div>
  )
  
}

export default List