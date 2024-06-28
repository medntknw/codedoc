import React from 'react'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { LANGUAGES } from '../constants';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const LanguageSelector = (props) => {

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        props.onSelect(value);
    };

    return (
        <FormControl sx={{ width: 300, mt:3, mb: 1}}>
            <InputLabel>Language</InputLabel>
            <Select
                value={props.selected}
                onChange={handleChange}
                input={<OutlinedInput label="Language" />}
                MenuProps={MenuProps}
            >
            {LANGUAGES.map((language) => (
                <MenuItem
                key={language}
                value={language}
                >
                {language}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
    )
}

export default LanguageSelector
