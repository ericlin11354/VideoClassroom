import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Select from "./Select";
import { useRouter } from "next/router";

interface VideoPlayerProps {
	knobDiam?: number;
	defaultFracFull?: number;
	barFillProps?: {};
	knobProps?: {};
}

export const LoginPanel: React.FC<VideoPlayerProps> = ({
	knobDiam=10,
	defaultFracFull=0,
	barFillProps,
	knobProps,
	children,
	...props
}): React.ReactElement => {
	const usernameFormRef = useRef<HTMLInputElement>(null);
	const passwordFormRef = useRef<HTMLInputElement>(null);

	const newUsernameFormRef = useRef<HTMLInputElement>(null);
	const newPasswordFormRef = useRef<HTMLInputElement>(null);
	const confirmPasswordFormRef = useRef<HTMLInputElement>(null);
    
    const [warnMsg, setWarnMsg] = useState<string>('');
    const [msgIsWarn, setMsgIsWarn] = useState<boolean>(true);
    const [isSignup, setIsSignup] = useState<boolean>(false);

    const [newUserType, setNewUserType] = useState<string>('user');
    
    const router = useRouter();
    
    const toggleSignin = (e: React.MouseEvent<HTMLElement>) => {
        setWarnMsg('')
		setIsSignup(!isSignup)
	}

    const checkIfValid = (UN: string, PW: string): boolean => {
        if (UN.length >= 4 && PW.length >= 4 && UN.length < 32 && PW.length < 32){
            return true
        } else {
            return false
        }
	}

    const createUser = (UN: string, PW: string, accessLvl: string): string => {
		if(!checkIfValid(UN, PW)){
            return 'Username and password must contain at least 4 characters and less than 32.'
        }
        //actually create the user here

        return ''
	}

    const loginUser = (UN: string, PW: string): string => {
		if((UN === 'user' || UN === 'admin') && UN === PW){

            //actually log in here
            router.replace({
                pathname: router.pathname,
                query: 
                {
                    ...router.query,
                    username: UN,
                },
            })

            return ''
        }
        return 'Invalid credentials.'
	}

    const notify = (msg: string, isPositive?: boolean) => {
        if(isPositive == undefined){
            isPositive = false
        }
        setMsgIsWarn(!isPositive)
		setWarnMsg(msg)
	}

    const attemptSignin = (e: React.MouseEvent<HTMLElement>) => {
        if (isSignup){
            if (newUsernameFormRef && newUsernameFormRef.current &&
                newPasswordFormRef && newPasswordFormRef.current &&
                confirmPasswordFormRef && confirmPasswordFormRef.current
            ){
                const newUN = newUsernameFormRef.current.value
                const newPW = newPasswordFormRef.current.value
                const repeatPW = confirmPasswordFormRef.current.value
                if (!(newPW.normalize() === repeatPW.normalize())){
                    notify('The passwords don\'t match.')
                }

                const result = createUser(newUN, newPW, newUserType)

                if (!(result === '')){
                    notify(result)
                } else {
                    notify('Success', true)
                }
            }
        } else {
            if (usernameFormRef && usernameFormRef.current &&
                passwordFormRef && passwordFormRef.current
            ){
                const UN = usernameFormRef.current.value
                const PW = passwordFormRef.current.value
                const result = loginUser(UN, PW)

                if (!(result === '')){
                    notify(result)
                } else {
                    notify('Success', true)
                }
            }
        }
	}

    if (isSignup){
        return(
            <LoginFrame>
                <Title>
                    Sign up
                </Title>
                <LineForm ref={newUsernameFormRef} type={'text'}>
                </LineForm>
                <LineForm ref={newPasswordFormRef} type={'password'}>
                </LineForm>
                <LineForm ref={confirmPasswordFormRef} type={'password'}>
                </LineForm>
                <Select values={['user', 'admin']} setSelected={setNewUserType}>
                </Select>
                <LoginButton onClick={attemptSignin}>
                    Sign up
                </LoginButton>
                <Warning isWarn={msgIsWarn}>
                    {warnMsg}
                </Warning>
                <span>
                    Already have an account? <Switcher onClick={toggleSignin}>Log in here.</Switcher>
                </span>
            </LoginFrame>
        )
    }else{
        return(
            <LoginFrame>
                <Title>
                    Log in
                </Title>
                <LineForm ref={usernameFormRef} type={'text'}>
                </LineForm>
                <LineForm ref={passwordFormRef} type={'password'}>
                </LineForm>
                <LoginButton onClick={attemptSignin}>
                    Log in
                </LoginButton>
                <Warning isWarn={msgIsWarn}>
                    {warnMsg}
                </Warning>
                <span>
                    Don't have an account? <Switcher onClick={toggleSignin}>Sign up here.</Switcher>
                </span>
            </LoginFrame>
        )
    }
}

const Warning = styled.span<{isWarn: boolean}>`
    ${({ isWarn }): string =>
    isWarn
    ? `
        color: red;
    `
    : `
        color: green;
    `}
    text-align: center;
`;
const Title = styled.div<{}>`
    text-align: center;
`;
const LoginButton = styled.button<{}>`
`;
const Switcher = styled.a<{}>`
    user-select: none;
    color: blue;
    :hover {
        color: lightblue;
    }
`;
const LineForm = styled.input<{}>`
`;
const LoginFrame = styled.div<{}>`
    padding: 5px;
	position: relative;
    min-width: 300px;
    min-height: 250px;
    width: 50vw;
    height: 40vh;
    background-color: #ffffff;
    
    display: flex;
    flex-direction: column;
    gap: 5px;

    overflow: auto;
`;

export default LoginPanel;