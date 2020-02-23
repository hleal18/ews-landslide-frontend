import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    button: {
        textTransform: 'none'
    }
}));

const ButtonRoute = ({ route, content, history }) => {
    const classes = useStyles();
    return (
        <Button 
            color="inherit" 
            onClick={() => history.push(`/${route}`)} 
            className={classes.button}
        >
            {content}
        </Button>
    )
}

const BreadCrumbs = ({ history, routes, currentContent, contents }) => {
    return (
    <div>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {
            routes.map((route, ind) => 
                    <ButtonRoute 
                        route={route} 
                        content={contents[ind]}
                        history={history}
                        key={ind}
                    />)
        }
        <Typography color="textPrimary">{currentContent}</Typography>
      </Breadcrumbs>
    </div>)
}

export default withRouter(BreadCrumbs);