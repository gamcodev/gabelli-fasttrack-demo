import { useRouter } from "next/router";

const ShowFund = () => {

	const router = useRouter();
	const { ticker } = router.query;

	return <>{ ticker }</>

}

export default ShowFund
