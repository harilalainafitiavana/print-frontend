interface User {
    profils?: string | null;  // Image Cloudinary
    google_avatar_url?: string;
}

export const getAvatarUrl = (user: User | null): string | null => {
    if (!user) return null;

    // 1️⃣ Priorité à l'avatar Google
    if (user.google_avatar_url) {
        return user.google_avatar_url;
    }

    // 2️⃣ Si l'utilisateur a une image Cloudinary
    if (user.profils) {
        // Si c'est déjà une URL complète (Cloudinary)
        if (user.profils.startsWith('http')) {
            return user.profils;
        }

        // Cas rare : chemin encodé (ex: avant migration Cloudinary)
        if (user.profils.includes('https%3A') || user.profils.includes('http%3A')) {
            const decodedUrl = decodeURIComponent(user.profils.replace('/media/', ''));
            return decodedUrl.replace('https:/', 'https://').replace('http:/', 'http://');
        }

        // ⚠️ Pas de placeholder ici car Cloudinary doit renvoyer une URL complète
        return null;
    }

    // 3️⃣ Pas d'image
    return null; // ou "/placeholder.png" si tu veux
};
