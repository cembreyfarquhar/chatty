import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles, fade } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Drawer from '@material-ui/core/Drawer'
import AddIcon from '@material-ui/icons/AddCircle'

import AddContact from '../AddContact/'

import db from '../../db'
import { Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'sticky',
        top: 0,
        zIndex: 5,
    },
    appBar: {
        height: '100%',
        maxHeight: '100%',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    toolbar: {
        display: 'flex',
        maxHeight: '100%',
        width: '100vw',
        justifyContent: 'space-between',
    },
    backButton: {
        marginRight: '2rem',
    },
    settingsButton: {},
    title: {
        fontSize: '2rem',
    },
    search: {
        position: 'relative',
        borderRadius: '2%',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        ['@media (max-width: 600px)']: {
            right: 5,
            position: 'fixed',
            width: '50%',
            textAlign: 'center',
        },
    },
    dropDownHome: {
        width: '100vw',
    },
    chattyLogo: {
        height: '50px',
    },
}))

export default function TopNav({ chattingWith, history }) {
    const classes = useStyles()

    const view = window.location.pathname

    const [drawer, toggleDrawer] = useState(false)

    if (view === '/') {
        return <HomeView />
    } else if (view === '/chat') {
        return <ChatView chattingWith={chattingWith} history={history} />
    } else {
        return <InvitedView />
    }

    function HomeView() {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={e => {
                                e.preventDefault()
                                toggleDrawer(true)
                                console.log('DRAWER IS: ', drawer)
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                        <Drawer
                            anchor={'bottom'}
                            open={drawer}
                            onClose={() => toggleDrawer(false)}
                        >
                            {/* <DropDownHome /> */}
                            {DropDownHome()}
                        </Drawer>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            Chatty
                        </Typography>
                    </Toolbar>
                    <Button
                        onClick={e => {
                            e.preventDefault()
                            localStorage.clear()
                            history.push('/')
                        }}
                    >
                        Log out
                    </Button>
                </AppBar>
            </div>
        )
    }

    function ChatView({ chattingWith }) {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            className={classes.backButton}
                            color="inherit"
                            aria-label="Go Back"
                            onClick={e => {
                                e.preventDefault()
                                history.push('/')
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            {chattingWith !== null && chattingWith}
                        </Typography>
                        <IconButton
                            edge="end"
                            className={classes.settingsButton}
                            color="inherit"
                            aria-label="Open Settings"
                            onClick={e => {
                                e.preventDefault()
                                history.push('/')
                            }}
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    function InvitedView() {
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Drawer
                            anchor={'bottom'}
                            open={drawer}
                            onClose={() => toggleDrawer(false)}
                        >
                            {/* <DropDownHome /> */}
                            {DropDownHome()}
                        </Drawer>
                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap
                        >
                            Chatty
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    function DropDownHome() {
        return (
            <div className={classes.dropDownHome} role="presentation">
                <AddContact />
            </div>
        )
    }
    function AddFriend() {
        const [contactID, setContactID] = useState('')
        const [nickname, setNickname] = useState('')

        function addContact(event) {
            event.preventDefault()
            console.log(db.contacts)
            console.log('click')
            // need some error handling for users that already exist
            db.contacts.add({
                nickname,
                contactID,
                myID: localStorage.getItem('userID'),
            })
        }
        return (
            <form onSubmit={e => addContact(e)}>
                <h3>{`Your ID: ${localStorage.getItem('userID')}`}</h3>

                <h2>Enter contact ID</h2>
                <input
                    type="text"
                    value={contactID}
                    onChange={e => setContactID(e.target.value)}
                />
                <h2>Enter a nickname for this contact</h2>
                <input
                    type="text"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                />
                <button type="submit">Add to Contacts</button>
            </form>
        )
    }
}
