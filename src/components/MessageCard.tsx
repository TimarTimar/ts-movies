import React from "react";
import { Card, CardContent } from "@material-ui/core";

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
