import React, { useState } from 'react';
import './Menu.css';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";
import { setToken, setUser } from './functions';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    width: `calc(100% - ${drawerWidth}px - 20px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#fff",
    padding: theme.spacing(3),
  },
}));

const Menu = props =>{
  //Obtengo el usuario
  const user = JSON.parse(localStorage.getItem("finanzasCurrentUser"))
  const classes = useStyles()
  const history = useHistory()
  const [ colapsables, setColapsables ] = useState({})

  const onClickOpcion = link => {
    history.push(link)
  }

  const cerrarSesion = () => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    localStorage.removeItem("finanzasCurrentUser");
    setUser(false)
    // voy al login
    history.push("/login")
  }

  //Defino accesos del usuario al meno
  let opcionesMenu = []
  if(user){
    if(user.permits === 'admin'){
      opcionesMenu = [
        {
          label: 'Home',
          onClick: () => onClickOpcion('/home')
        },
        {
          label: 'Monedas',
          onClick: () => onClickOpcion('/monedas')
        },
        {
          label: 'Categorías',
          onClick: () => onClickOpcion('/categorias')
        },
        {
          label: 'Clientes',
          onClick: () => onClickOpcion('/clientes')
        },
        {
          label: 'Cerrar sesión',
          onClick: () => cerrarSesion()
        }
      ]
    } else {
      opcionesMenu = [
        {
          label: 'Home',
          onClick: () => onClickOpcion('/home')
        },
        {
          label: 'Categorías',
          onClick: () => onClickOpcion('/categorias')
        },
        {
          label: 'Registros',
          subLista: [
            {
              label: 'Lista de registros',
              onClick: () => onClickOpcion('/registros')
            },
            {
              label: 'Nuevo registro',
              onClick: () => onClickOpcion('/registros/crear')
            },
          ]
        },
        {
          label: 'Reportes',
          subLista: [
            {
              label: 'Gastos diarios por mes',
              onClick: () => onClickOpcion('/reportes/gastos-diarios-por-mes')
            },
            {
              label: 'Gastos por categoría',
              onClick: () => onClickOpcion('/reportes/gastos-por-categoria')
            },
          ]
        },
        {
          label: 'Cerrar sesión',
          onClick: () => cerrarSesion()
        }
      ]
    }
  }

  const handleClickSubmenu = index => {
    const label = opcionesMenu[index].label
    setColapsables({
      ...colapsables,
      [label]: colapsables[label] ? false : true
    })
  }

  return(
    <div className="row main-container">
      <div className="menu">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <List>
            {opcionesMenu.map((opcion, index) => (
              opcion.subLista ?
              <React.Fragment key={index}>
                <ListItem button onClick={()=>handleClickSubmenu(index)}>
                  <ListItemText primary={opcion.label} />
                  {colapsables[opcion.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={colapsables[opcion.label]} timeout="auto" unmountOnExit>
                  {
                    opcion.subLista.map(subOpcion=>{
                      return <ListItem 
                        button
                        key={subOpcion.label}
                        onClick={subOpcion.onClick}
                        className="submenu"
                        >
                        <ListItemText primary={subOpcion.label} />
                      </ListItem>
                    })
                  }
                </Collapse>
              </React.Fragment>
              :
              <ListItem 
                button
                key={opcion.label}
                onClick={opcion.onClick}
                >
                <ListItemText primary={opcion.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  )
}

export default Menu