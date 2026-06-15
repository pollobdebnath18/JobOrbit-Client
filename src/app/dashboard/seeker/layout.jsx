import { getUserRole } from '@/lib/core/session';
import React from 'react';

const SeekerLayout = async({children}) => {
    await getUserRole("seeker");
    return (
        <div>
            {children}
        </div>
    );
};

export default SeekerLayout;