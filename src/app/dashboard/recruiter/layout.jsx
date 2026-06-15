import { getUserRole } from '@/lib/core/session';
import React from 'react';

const RecruiterLayout = async({children}) => {
    await getUserRole("recruiter");
    return (
        <div>
            {children}
        </div>
    );
};

export default RecruiterLayout;