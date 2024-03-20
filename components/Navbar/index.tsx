import Image from "next/image";
import {
	HomeIcon,
	SearchIcon,
	ExploreIcon,
	ReelsIcon,
	CreateIcon,
	SendIcon,
	HeartIcon,
	MenuIcon
} from "@/components/icons";
import { BarItem } from "../NavItem";
import Link from "next/link";
import { MoreBar } from "../MoreBar";

function Navbar() {
	return (
		<section className="flex h-[50px] fixed bottom-0 items-center justify-between w-full  p-3 xl:p-7  px-7 md:px-0  border-t border-gray-300/15 md:flex-col md:w-[72px] md:h-full md:border-r md:border-t-0 xl:w-[244px] xl:items-start md:py-7">
			<Link href="/">
				<Image
					src="/catstagramLogo.png"
					alt="catslogo"
					className="hidden md:flex xl:hidden"
					width={32}
					height={32}
				/>

				<Image
					src="/catstagram.png"
					alt="catslogo"
					className=" hidden xl:flex dark:invert"
					width={119}
					height={28}
				/>
			</Link>
			<div className="flex-1 md:py-20 flex md:flex-col justify-between max-h-[750px]">
				<BarItem text="Home" href="/">
					<HomeIcon />
				</BarItem>

				<BarItem text="Search" className="hidden md:flex" href="/search">
					<SearchIcon />
				</BarItem>

				<BarItem text="Explore" href="/explore">
					<ExploreIcon />
				</BarItem>

				<BarItem text="Reels" href="/reels">
					<ReelsIcon />
				</BarItem>
				<BarItem text="Create" className="flex md:hidden" href="/create">
					<CreateIcon />
				</BarItem>

				<BarItem text="Messages" href="/messages">
					<SendIcon />
				</BarItem>
				<BarItem
					text="Notifications"
					className="flex md:hidden"
					href="/notifications"
				>
					<HeartIcon />
				</BarItem>
				<BarItem text="Create" className="hidden md:flex" href="/create">
					<CreateIcon />
				</BarItem>
			</div>
			<MoreBar />
		</section>
	);
}
export { Navbar };
