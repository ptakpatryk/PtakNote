import React from 'react';
import Input from './Input';

export default { title: 'Atoms/Input' };

export const Normal = () => <Input placeholder="login" />;
export const Search = () => <Input placeholder="login" search />;