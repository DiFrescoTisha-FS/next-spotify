<button className="bg-[#18d860] text-white p-5 rounded-lg"
onClick={() => signIn(provider.id, { callbackUrl: "/" })}
>
  Login with {provider.name}
</button>