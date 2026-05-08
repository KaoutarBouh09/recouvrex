import React from 'react';
import { Slider } from '@mui/material';
import { Box } from '@mui/system';

interface NumberPickerProps {
    value: number;
    onChange: (newValue: number) => void;
}

const NumberPicker: React.FC<NumberPickerProps> = ({ value, onChange }) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            onChange(newValue);
        }
    };

    return (
        <Box sx={{ mx: 1, px: 1,mt:1,pt:2 }}>
            {/* Achievement */}
            <Slider
                value={value}
                onChange={handleChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="on"
                valueLabelFormat={(value) => `${value}%`}
                step={5}
                marks
                min={0}
                max={100}
            />
        </Box>
    );
}

export default NumberPicker;
