import { Button } from "./ui/button";



interface IProps {
    provider: "google" | "github";
    signUp?: boolean
}


export const SignInOauthButton = ({
    provider,
    signUp
}: IProps) => {

    const action = signUp ? "Up" : "In";
    const providerName = provider === "google" ? "Google" : "Github";

    return (
        <Button>
            Sign {action} with {providerName}
        </Button>
    )

}