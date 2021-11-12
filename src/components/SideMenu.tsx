import React from 'react'
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';



const useStyles = makeStyles({
    root : {
        '& ul' : {
            padding: '0',
            listStyleType: 'none',
            display: 'block',
            paddingInlineStart: '0px',
            margin: '0',
            overflow: 'hidden',
            backgroundColor: '#F2B872',
            '& li' : {
                float: 'left',
                '& a' : {
                    display: 'block',
                    color: 'white',
                    textAlign: 'center',
                    padding: '12px',
                    textDecoration: 'none'
                },
                '& a:hover' : {
                    backgroundColor: '#A67A29'
                }
            }
        }
    }
})

const SideMenu : React.FC = () => {

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/start'>Start</NavLink></li>
                <li><NavLink to='/play'>Play</NavLink></li>
                <li><NavLink to='/gallery'>Gallery</NavLink></li>
                <li><NavLink to='/stats'>Statistics</NavLink></li>
                <li><NavLink to='/history'>History</NavLink></li>
            </ul>
        </div>
    )
}

export default SideMenu
