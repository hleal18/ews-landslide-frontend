import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { variablesDefinitionAsObject } from '../../lib/variablesDefinition';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        fontSize: 12
    },
    chip: {
        marginBottom: 4
    },
    secondTitle: {
        marginBottom: 8
    }
});

export default function VariableCard({ _id, name, description, idSensor, type, threshold, handleOpenConfigureMenu }) {
    const classes = useStyles();
    let lowerBound = undefined, upperBound = undefined;
    
    if (threshold) {
        if (threshold.upperBound) upperBound = threshold.upperBound;
        if (threshold.lowerBound) lowerBound = threshold.lowerBound;
    }
    
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" >
                    Variable Ambiental
                <Typography variant="h5" component="h2" className={classes.secondTitle} color='primary'>
                    {name}
                </Typography>
                </Typography>
                <Typography className={classes.secondTitle} color="textSecondary" >
                    Identificación: {idSensor}
                </Typography>
                <Typography className={classes.secondTitle} color="textSecondary" >
                    Tipo: {variablesDefinitionAsObject[type]}
                </Typography>
                <Grid container spacing={0} direction="column" className={classes.pos}>
                    <Grid container direction="row">
                        <Grid item xs>
                            <Typography className={classes.pos} color="textSecondary">
                                Umbral inferior:
                            </Typography>
                        </Grid>
                        <Grid container item xs spacing={1} direction="column" justify='center' alignContent='center'>
                            <Grid item xs>{lowerBound ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='primary' /> }</Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="row">
                        <Grid item xs>
                            <Typography className={classes.pos} color="textSecondary">
                                Umbral superior:
                            </Typography>
                        </Grid>
                        <Grid container item xs spacing={1} direction="column" justify='center' alignContent='center'>
                            <Grid item xs>{upperBound ? <CheckBoxIcon color='primary' /> : <CheckBoxOutlineBlankIcon color='primary' /> }</Grid>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" alignItems='center'>
                        <Grid item xs>
                            <Typography className={classes.title} color="textSecondary">
                            {lowerBound ? `${lowerBound} <` : '' } {!upperBound && !lowerBound ? '' : 'X'} {upperBound ? `< ${upperBound}` : ''}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container spacing={2} justify="center" direction="row">
                    <Grid item>
                        <Button size="small" color="primary" onClick={() => (handleOpenConfigureMenu(_id))}>
                            Configurar
                        </Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
