import { englishRegex } from "@/regexs/englishExpression";
import { z } from "zod";

export const zCategoryDto = z.object({
    parent:z.string().nonempty().optional(),
    title:z.string(),
    titleEn:z.string().regex(
        englishRegex
    ),
}).strict();