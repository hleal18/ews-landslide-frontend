import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: '50%',
        maxWidth: '100%',
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
}));

export default function SelectForm({ 
    id, 
    label = "default", 
    names = [], 
    value = "", 
    options = [],
    handleChange
}) {
    const classes = useStyles();
    
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
            <Select
              native
              value={value}
              onChange={handleChange}
              inputProps={{
                  name: 'age',
                  id: 'age-native-simple'
              }}
            >
              {names.map((name, ind) => (
                <option key={name} value={options[ind]} >
                  {name}
                </option>
                ))}
            </Select>
        </FormControl>              
    )
}