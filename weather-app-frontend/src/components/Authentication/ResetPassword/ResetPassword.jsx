import { useState, useRef, useEffect, useContext } from 'react';
import { faCheck, faTimes,faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from 'react-router-dom';

import AuthContext from '../../../context/AuthContext';
import '../Register/Register.scss'

const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%-]).{8,24}$/

const ResetPassword = () => {

    const { resetUserPassword } = useContext(AuthContext)
    const { resetCode } = useParams()

    const pwdRef = useRef()
    const errRef = useRef()

    const [errMsg, setErrMsg] = useState('');

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    useEffect(() => {
        pwdRef.current.focus()
    }, []);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('')
    }, [pwd, matchPwd]);

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!PWD_REGEX.test(pwd)){
            setErrMsg('Invalid Entry')
            errRef.current.focus()
            return
        }

        resetUserPassword({
            new_password: pwd,
            token: resetCode
        })

    }

    return (
        <div className='authenticate'>
            <form className='authentication-form' onSubmit={handleSubmit} >

                <h2>Password Reset</h2>

                <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                    {errMsg}
                </p>

                <div className='form-group'>
                    <label htmlFor='password'>
                        Password

                        <span className={validPwd ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} className='check'/>
                        </span>

                        <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes} className='wrong'/>
                        </span>
                    </label>

                    <input
                        type='password'
                        id='password'
                        value={pwd}
                        ref={pwdRef}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        aria-invalid={validPwd ? 'false' : 'true'}
                        aria-describedby='pwd_note'
                        required
                    />

                    <div id='pwd_note' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} className='info-icon'/>
                        <p>Password must be:</p>

                        <ul>
                            <li>Between 8 to 24 characters</li>
                            <li>At least 1 letter</li>
                            <li>At least 1 number</li>
                            <li>
                                At least 1 special character:
                                    <span aria-label='exclamation mark'>!</span>
                                    <span aria-label='at symbol'>@</span>
                                    <span aria-label='hashtag'>#</span>
                                    <span aria-label='dollar sign'>$</span>
                                    <span aria-label='percent'>%</span>
                                    <span aria-label='hyphen'>-</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='confirm_password'>
                        Confirm Password

                        <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                            <FontAwesomeIcon icon={faCheck} className='check'/>
                        </span>

                        <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                            <FontAwesomeIcon icon={faTimes}  className='wrong'/>
                        </span>
                    </label>

                    <input
                        type='password'
                        id='confirm_Password'
                        value={matchPwd}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        aria-invalid={validMatch ? 'false' : 'true'}
                        aria-describedby='confirm_note'
                        required
                    />

                    <div id='confirm_note' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle} className='info-icon'/>
                        <p>Must match password</p>
                    </div>
                </div>

                <input type='submit' disabled={!validPwd || !validMatch ? true : false}/>
            </form>
        </div>
    );
}

export default ResetPassword;