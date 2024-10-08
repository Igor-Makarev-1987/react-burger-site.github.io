import React from 'react';
import { Link } from 'react-router-dom';
import notFoundStyle from './notFound.module.css'

function NotFound404() {
    return (
        <>
            <div className={notFoundStyle.main} >
                <div>
                    <h2 className={notFoundStyle.text_red}>404 page</h2>
                    <br />
                    <Link to='/' >Перейти на главную страницу</Link>
                </div>
            </div>
        </>
    );
}

export default NotFound404;