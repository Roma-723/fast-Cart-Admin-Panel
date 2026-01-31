import React from "react"
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "@/api/authApi/authApi"

export function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function submitLogin(e) {
    e.preventDefault()

    const userName = e.target.userName.value
    const password = e.target.password.value

    if (userName !== "SuperAdmin" || password !== "SuperAdmin2024") return

    const res = await dispatch(
      loginUser({
        userName,
        password,
      })
    )

    if (res.payload?.statusCode === 200) {
      navigate("/dashboard/home")
    }
  }
  return (
    <section className="m-8 lg:my-0 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to Sign In.
          </Typography>
        </div>

        <form
          onSubmit={submitLogin}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              name="userName"
              size="lg"
              placeholder="SuperAdmin"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
            />

            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="SuperAdmin2024"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
            />
          </div>
          <Checkbox
            label={
              <Typography variant="small" color="gray" className="font-medium">
                I agree the{" "}
                <span className="underline cursor-pointer">
                  Terms and Conditions
                </span>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />

          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  )
}

export default SignIn
