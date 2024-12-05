"use server"

import { openEmbed } from "@play-ai/web-embed";

export async function openEmbedAction(id){
 

    try {
 
        const result = openEmbed(id);
        return { success: true, result };
      } catch (error) {
        console.error("Error in handleEmbed:", error);
        return { success: false, error: error.message };
      }
}