import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        // margin: theme.spacing(1),
        minWidth: '50%',
        maxWidth: '100%',
    }
}));

export default function SelectForm({
    id = "default",
    label = "default",
    names = [],
    value = "",
    options = [],
    handleChange,
    fullWidth
}) {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl} fullWidth={fullWidth}>
            <InputLabel >{label}</InputLabel>
            <Select
                value={value}
                onChange={(e) => { e.target.id = id; handleChange(e); }}
                id={id}
                name={label}
                fullWidth={fullWidth}
            >
                {
                    names.map((name, ind) => (
                        <MenuItem key={name} value={options[ind]} >
                            {name}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}