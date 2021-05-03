import { Card, CardContent } from "@material-ui/core";
import React from "react";

interface MessageCardProps {
	message: string;
}

export default function MessageCard({ message }: MessageCardProps) {
	return (
		<Card variant="outlined">
			<CardContent>{message}</CardContent>
		</Card>
	);
}
