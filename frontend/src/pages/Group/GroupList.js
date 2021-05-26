import React from 'react'
import { Link } from 'react-router-dom';
import GroupItem from '../../components/group/GroupItem';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Typography } from "@material-ui/core";
import './GroupList.css'
import ScrollToTop from 'components/Scroll/ScrollToTop';
function GroupList() {
    return (
        <div className="grouplist">
            <ScrollToTop />
            <Typography style={{marginLeft: '20px'}} variant="h6">나의 그룹</Typography>
            <GroupItem></GroupItem>
            <Link to="/group/create">
                <AddToPhotosIcon className="plusbtn" fontSize='large'></AddToPhotosIcon>
            </Link>
        </div>
    )
}

export default GroupList
