import React, { ChangeEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


interface AppProps{
  group: RadioProps[];
}

interface RadioProps {
  text: string
}

export default function RadioButton(props: AppProps) {
  const classes= useStyles();
  const { group } = props;
  const [value, setValue] = useState('female');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        { group.map((radio: RadioProps) => {
          return (
            <FormControlLabel value={radio.text} control={<Radio size="small" />} label={radio.text}
              className={classes.radioLabel}
            />
          )
        }) }
      </RadioGroup>
    </FormControl>
  );
}

const useStyles = makeStyles((theme) => ({
  radioLabel: {
    "& .MuiTypography-body1": {
      fontSize: 14
    }
  }
}));
