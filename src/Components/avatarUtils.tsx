interface User {
    profils?: string | null;  // Image Cloudinary (URL complète maintenant)
    google_avatar_url?: string;
}

export const getAvatarUrl = (user: User | null): string => {
    if (!user) return '/default-avatar.png';  // Retourne toujours un string

    // 1️⃣ Priorité à l'avatar Google (inchangé)
    if (user.google_avatar_url) {
        return user.google_avatar_url;
    }

    // 2️⃣ Image Cloudinary - SIMPLIFIÉ
    if (user.profils) {
        // Avec Cloudinary, c'est TOUJOURS une URL complète
        // Exemple: "https://res.cloudinary.com/votre-compte/image/upload/..."
        return user.profils;
    }

    // 3️⃣ Pas d'image → placeholder
    return '/default-avatar.png';
};