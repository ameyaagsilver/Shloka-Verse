import React from 'react';
import { Grid, InputAdornment, IconButton, TextField } from '@material-ui/core'
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export const Input = ({ half, name, label, autoFocus, handleChange, handleShowPassword, type }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={name}
                onChange={handleChange}
                required
                variant="outlined"
                autoFocus={autoFocus}
                label={label}
                fullWidth
                type={type}
                InputProps={name==='password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type==='password' ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            >
            </TextField>
        </Grid>
    )
}
