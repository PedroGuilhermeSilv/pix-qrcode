import * as React from 'react';
import inputMask, { MaskTypes } from '../utils/inputMask';


type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    maskType?: MaskTypes;
};

function TextInput({ maskType, onChange, ...props }: TextInputProps) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (maskType) {
            const mask = inputMask[maskType];
            event.currentTarget.value = mask(event);
        }

        if (typeof onChange === 'function') {
            onChange(event);
        }
    }

    return <input {...props} type="text" onChange={handleChange} />;
}

export default TextInput;