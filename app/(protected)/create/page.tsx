"use client";
import { DragEvent, FormEvent, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CameraIcon, CheckIcon } from "@/components/icons";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Create() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [view, setView] = useState(0);
  const submitFirstPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setView((view) => view + 1);
  };

  const submitSecondPage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataForm = new FormData(form);
    const place = formDataForm.get("place") || "";
    const title = formDataForm.get("title") || "";
    const description = formDataForm.get("description") || "";
    const formdata = new FormData();
    formdata.append("file", file as Blob);
    formdata.append("place", place);
    formdata.append("title", title);
    formdata.append("description", description);
    setLoading(true);
    const requestOptions = { method: "POST", body: formdata };
    console.log(file);
    requestOptions.body.forEach((data) => console.log(data));
    const response = await fetch(
      `${document.location.origin}/api/create`,
      requestOptions,
    );
    const data = await response.json();
    if (response.status === 200) {
      setView((view) => view + 1);
      setLoading(false);
    }
  };

  const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setLoading(true);
  };

  const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setLoading(false);
  };
  const onDragEnd = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setLoading(false);
  };

  const onDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setLoading(false);
    if (e.dataTransfer?.files?.length) {
      setFile(e.dataTransfer?.files?.[0]);
    }
  };
  useEffect(() => {
    if (file) {
      const acceptedFiles = [
        "image/jpeg",
        "image/png",
        "image/tiff",
        "image/psd",
        "image/bmp",
        "image/webp",
      ];
      const image = file as File;
      if (!acceptedFiles.includes(image?.type as string)) {
        setFile("");
        toast({
          description: `Failed to load  file with type .${image?.type.split("/")[1]}`,
          type: "foreground",
          duration:7000
        });
      }
    }
  }, [file]);
  return (
    <main className="flex justify-center ">
      <Card
        className={`w-[370px] min-h-[370px] p-3 ${loading ? "animate-pulse" : ""}`}
      >
        <Progress value={25 * (view + 1)} />
        {view === 0 && (
          <form onSubmit={() => setView(view + 1)}>
            <CardHeader className="flex justify-center items-center flex-col">
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Create Your Post In A Few minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 items-center justify-center">
              <CameraIcon />
              <Button>Start</Button>
            </CardContent>
            <CardFooter>
              <ul className="list-disc flex flex-col gap-4 px-4">
                <li>
                  Do not upload <b>violence</b> or <b>abuse</b> of animals
                </li>
                <li>
                  Only upload things that have to do with <b>animals</b>
                </li>
                <li>
                  <b>Don&apos;t plagiarize:</b> Never copy other people&apos;s
                  work or ideas without giving them proper credit. Always cite
                  sources in the description when using information or content
                  from others and respect copyright.
                </li>
              </ul>
            </CardFooter>
          </form>
        )}
        {view === 1 && (
          <form
            onSubmit={(e) => {
              submitFirstPage(e);
            }}
          >
            <CardHeader className="flex justify-center items-center flex-col">
              <CardTitle>Create Post</CardTitle>
              <CardDescription>Upload or drag a file</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 items-center justify-center">
              <CameraIcon />
              <Button type="submit" disabled={Boolean(!file)}>
                Continue
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-8 mt-8 items-center justify-center">
              <div className="flex w-full max-w-sm justify-center items-center gap-3 cursor-pointer ">
                <Label
                  htmlFor="picture"
                  className="text-center cursor-pointer"
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDragEnd={onDragEnd}
                  onDrop={onDrop}
                >
                  {file ? (
                    <Image
                      width={250}
                      height={250}
                      src={URL.createObjectURL(file as Blob)}
                      alt="Preview Image"
                      className="object-cover rounded-lg h-250 w-250"
                    />
                  ) : (
                    <div className="rounded-lg h-[250px] w-[250px] border-2 border-foreground border-dashed flex items-center justify-center">
                      <p className="max-w-[170px] text-md">
                        Drag The Photos, Videos Or Choose The File
                      </p>
                    </div>
                  )}
                </Label>
                <Input
                  disabled={loading}
                  onChange={(e) => setFile(e?.target?.files?.[0] || "")}
                  id="picture"
                  type="file"
                  className="cursor-pointer input-file hidden"
                  accept=".jpg, .png, .tiff, .psd, .bmp, .webp"
                />
              </div>
            </CardFooter>
          </form>
        )}
        {view === 2 && (
          <form
            onSubmit={(e) => {
              submitSecondPage(e);
            }}
          >
            <CardHeader className="flex justify-center items-center flex-col">
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Create Your Post In A Few minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 items-center justify-center">
              <CameraIcon />
              <Button type="submit" disabled={loading}>
                Finish
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-8 mt-8">
              <div className="grid w-full max-w-sm items-center gap-3 cursor-pointer ">
                <Label htmlFor="title">Title</Label>
                <Input
                  required
                  disabled={loading}
                  minLength={10}
                  maxLength={40}
                  id="title"
                  type="text"
                  placeholder="My cat in the forest"
                  name="title"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3 cursor-pointer ">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  disabled={loading}
                  cols={10}
                  minLength={10}
                  maxLength={600}
                  required
                  id="description"
                  placeholder="The cat just ate my mouse over a red fence in my neighborhoo"
                  name="description"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-3 cursor-pointer ">
                <Label htmlFor="place">Place</Label>
                <Input
                  id="place"
                  required
                  type="text"
                  placeholder="Catsland"
                  name="place"
                  minLength={2}
                  disabled={loading}
                  maxLength={25}
                />
              </div>
            </CardFooter>
          </form>
        )}
        {view === 3 && (
          <form>
            <CardHeader className="flex justify-center items-center flex-col">
              <CardTitle>Create Post</CardTitle>
              <CardDescription>
                Create Your Post In A Few minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-3 items-center justify-center flex-col">
              <CheckIcon />
              <p>You Have Finished Making Your Post</p>
            </CardContent>
            <CardFooter className="flex justify-center m-4">
              <Link
                href="/"
                className="bg-white border font-medium border-white text-black rounded-lg duration-200 p-2 hover:bg-gray-200 "
              >
                Return to Homepage
              </Link>
            </CardFooter>
          </form>
        )}
      </Card>
    </main>
  );
}
