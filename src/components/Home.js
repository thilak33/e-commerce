import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { loading, searchKeyword } from '../actions';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate, useParams } from 'react-router-dom';



const Home = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        props.searchKeyword('')
    })
    return <>
        <List sx={{
            width: '100%',
        }}
            component="nav"
            aria-label="mailbox folders"
        >
            <ListItem button onClick={() => {
                props.loading(true)
                navigate('/category/electronics')
            }} >
                <ListItemText primary="Electronics" />
            </ListItem>
            <Divider />
            <ListItem button divider onClick={() => {
                props.loading(true)
                navigate('/category/jewelery')
            }} >
                <ListItemText primary="Jewelery" />
            </ListItem>
            <ListItem button onClick={() => {
                props.loading(true)
                navigate(`/category/men's clothing`)
            }}>
                <ListItemText primary="Men's clothing" />
            </ListItem>
            <Divider light />
            <ListItem button onClick={() => {
                props.loading(true)
                navigate(`/category/women's clothing`)
            }}>
                <ListItemText primary="Women's clothing" />
            </ListItem>
        </List>
    </>
}

const mapStateToProps = state => {
    return { products: state.products.products };
};


export default connect(mapStateToProps,
    { loading, searchKeyword })(Home)


