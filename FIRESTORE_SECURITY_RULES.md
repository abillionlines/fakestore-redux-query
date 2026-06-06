Firestore Security Rules — example and notes

This file contains example Firestore rules and guidance for the `firestore.rules` file committed alongside it.

Overview
- `users/{uid}`: allow users to read/write only their own profile (checked by `request.auth.uid`).
- `products/{id}`: public reads; writes restricted to admins via a custom claim `admin == true`.
- `orders/{id}`: authenticated users may create orders where `userId == request.auth.uid`; owners may read their orders.

Notes and next steps
- Custom claims: the `admin` rule shown requires setting a custom claim (`admin: true`) for admin accounts via the Firebase Admin SDK.
- UID-list alternative: if you prefer to hard-code admin UIDs you can check `request.auth.uid in ['uid1','uid2']`, but this is less flexible.
- Test rules in Console: use the Firebase Console Rules playground and the `firebase emulators:start --only firestore` to test locally.

Security is critical — review and adapt these rules before deploying to production.
