import { useContext, useRef, useState, useEffect } from 'react';
import { faCheck, faTimes,faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AuthContext from '../../../../context/AuthContext';
import './Register.scss'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%-]).{8,24}$/

const Register = ({login}) => {

    const { registerUser } = useContext(AuthContext)

    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');

    const [errMsg, setErrMsg] = useState('');

    //Set Focus to email input
    useEffect(() => {
        emailRef.current.focus()
    }, []);

    //Verifies Email
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email]);

    //Verifies Password and Confirm Password
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        setValidMatch(pwd === matchPwd)
    }, [pwd, matchPwd]);

    //Clears Error Message
    useEffect(() => {
        setErrMsg('')
    }, [email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        //if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(pwd)
        if(!v1 || !v2){
            setErrMsg('Invalid Entry')
            return
        }

        setErrMsg(await registerUser({
            email: email,
            password: pwd,
            phoneNumber: phoneNumber
        }))
        errRef.current.focus()
    }

    return (
        <form className={'authenticate'} onSubmit={handleSubmit}>

            <h2>Sign-up</h2>

            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
                {errMsg}
            </p>

            <div className='form-group'>
                <label htmlFor='email'>
                    Email

                    <span className={validEmail ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} className='check'/>
                    </span>

                    <span className={validEmail || !email ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} className='wrong'/>
                    </span>
                </label>

                <input
                    type='email'
                    id='email'
                    ref={emailRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    aria-invalid={validEmail ? 'false' : 'true'}
                    aria-describedby='email_note'
                    autoComplete='off'
                    required
                />

                <div id='email_note' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} className='info-icon'/>
                    <p>
                        <span aria-label='Your Email'>YourEmail</span>
                        <span aria-label='at symbol'>@</span>
                        Example
                        <span aria-label='dot'>.</span>
                        com
                    </p>
                </div>
            </div>

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

            <div className='form-group'>
                <label>Phone Number (optional)</label>
                <input
                    type='tel'
                    id='phone_number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    autoComplete='off'
                />
            </div>

            <input type='submit' disabled={!validEmail || !validPwd || !validMatch ? true : false}/>

            <p className='sign-in'>
                Already registered?<br/>
                <button onClick={login}>Sign In</button>
            </p>
        </form>
    );
}

export default Register;